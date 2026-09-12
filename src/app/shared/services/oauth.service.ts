import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { 
  GoogleCredentialResponse, 
  GoogleUserInfo, 
  GoogleIdConfiguration,
  GoogleButtonConfiguration 
} from '../types/google-identity-services';
import { environment } from '../../../environments/environment';

// Cliente JWT decoder para decodificar o token do Google
function parseJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  
  private userInfoSubject = new BehaviorSubject<GoogleUserInfo | null>(null);
  public userInfo$: Observable<GoogleUserInfo | null> = this.userInfoSubject.asObservable();

  private readonly clientId = '838656343224-8cr24hdeobtu00kevkhj27sudbuq8g97.apps.googleusercontent.com';
  private isInitialized = false;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {
    // Verifica se já existe um token salvo
    this.checkExistingAuthentication();
  }

  /**
   * Inicializa o Google Identity Services
   */
  public async initializeGoogleAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isInitialized || !window.google) {
        resolve();
        return;
      }

      try {
        const config: GoogleIdConfiguration = {
          client_id: this.clientId,
          callback: (response: GoogleCredentialResponse) => {
            this.handleCredentialResponse(response);
          },
          auto_select: false,
          cancel_on_tap_outside: true
        };

        window.google.accounts.id.initialize(config);
        this.isInitialized = true;
        console.log('✓ Google Identity Services initialized');
        resolve();
      } catch (error) {
        console.error('Error initializing Google Identity Services:', error);
        reject(error);
      }
    });
  }

  /**
   * Processa a resposta de credencial do Google
   */
  private handleCredentialResponse(response: GoogleCredentialResponse): void {
    console.log('=== GOOGLE CREDENTIAL RESPONSE ===');
    console.log('Response:', response);

    try {
      const userInfo: GoogleUserInfo = parseJWT(response.credential);
      
      if (!userInfo) {
        throw new Error('Failed to parse credential');
      }

      console.log('User info parsed:', userInfo);

      // Armazena informações do usuário
      this.userInfoSubject.next(userInfo);
      this.cookieService.set('google_user_info', JSON.stringify(userInfo), {
        expires: 7, // 7 dias
        path: '/',
        secure: window.location.protocol === 'https:'
      });

      // Marca como autenticado
      this.isAuthenticatedSubject.next(true);

      // Se estamos na página de login, redireciona para o callback
      if (window.location.pathname === '/login') {
        this.router.navigate(['/oauth-callback'], {
          queryParams: { 
            credential: response.credential,
            returnUrl: new URLSearchParams(window.location.search).get('returnUrl') || '/cafeterias'
          }
        });
      }

    } catch (error) {
      console.error('Error processing credential response:', error);
    }
  }

  /**
   * Inicia o processo de login com Google
   */
  public async login(): Promise<void> {
    await this.initializeGoogleAuth();
    
    if (window.google) {
      // Mostra o prompt do Google
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Identity Services not loaded');
    }
  }

  /**
   * Renderiza o botão do Google
   */
  public renderGoogleButton(element: HTMLElement, config?: Partial<GoogleButtonConfiguration>): void {
    if (!window.google || !this.isInitialized) {
      console.error('Google Identity Services not initialized');
      return;
    }

    const defaultConfig: GoogleButtonConfiguration = {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: '100%',
      ...config
    };

    window.google.accounts.id.renderButton(element, defaultConfig);
  }

  /**
   * Realiza logout
   */
  public logout(): void {
    // Remove informações armazenadas
    this.cookieService.delete('google_user_info', '/');
    this.cookieService.delete('access_token', '/');

    // Reseta estados
    this.isAuthenticatedSubject.next(false);
    this.userInfoSubject.next(null);

    // Revoga tokens do Google se possível
    if (window.google && this.getUserInfo()) {
      const userInfo = this.getUserInfo();
      if (userInfo) {
        window.google.accounts.id.revoke(userInfo.email, () => {
          console.log('Google tokens revoked');
        });
      }
    }

    console.log('User logged out');
    this.router.navigate(['/login']);
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public isAuthenticated(): boolean {
    if (!this.isAuthenticatedSubject.value) return false;

    // Verifica se o token do backend existe (exigido pelo interceptor)
    const hasBackendToken =
      !!this.cookieService.get('access_token') ||
      !!sessionStorage.getItem('access_token') ||
      !!sessionStorage.getItem('id_token');
    if (!hasBackendToken) return false;

    const userInfo = this.userInfoSubject.value;
    if (this.isTokenExpired(userInfo)) {
      this.cookieService.delete('google_user_info', '/');
      this.cookieService.delete('access_token', '/');
      this.isAuthenticatedSubject.next(false);
      this.userInfoSubject.next(null);
      return false;
    }
    return true;
  }

  /**
   * Obtém as informações do usuário
   */
  public getUserInfo(): GoogleUserInfo | null {
    return this.userInfoSubject.value;
  }

  /**
   * Obtém o nome do usuário
   */
  public getUserName(): string {
    const userInfo = this.getUserInfo();
    return userInfo?.name || '';
  }

  /**
   * Obtém o email do usuário
   */
  public getUserEmail(): string {
    const userInfo = this.getUserInfo();
    return userInfo?.email || '';
  }

  /**
   * Obtém a foto do usuário
   */
  public getUserPicture(): string {
    const userInfo = this.getUserInfo();
    return userInfo?.picture || '';
  }

  /**
   * Obtém o token de acesso do backend (se existir)
   */
  public getAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  /**
   * Verifica autenticação existente nos cookies
   */
  private checkExistingAuthentication(): void {
    const userInfoString = this.cookieService.get('google_user_info');
    if (userInfoString) {
      try {
        const userInfo: GoogleUserInfo = JSON.parse(userInfoString);
        if (this.isTokenExpired(userInfo)) {
          console.warn('Token expirado, removendo autenticação');
          this.cookieService.delete('google_user_info', '/');
          this.cookieService.delete('access_token', '/');
          return;
        }
        this.userInfoSubject.next(userInfo);
        this.isAuthenticatedSubject.next(true);
        console.log('✓ Existing authentication found');
      } catch (error) {
        console.error('Error parsing existing user info:', error);
        // Remove cookie inválido
        this.cookieService.delete('google_user_info', '/');
      }
    }
  }

  /**
   * Verifica se o token JWT está expirado
   */
  private isTokenExpired(userInfo: any): boolean {
    if (!userInfo?.exp) return false;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return userInfo.exp < nowInSeconds;
  }

  /**
   * Define informações do usuário (usado pelo callback component)
   */
  public setUserInfo(userInfo: GoogleUserInfo): void {
    this.userInfoSubject.next(userInfo);
    this.isAuthenticatedSubject.next(true);
    this.cookieService.set('google_user_info', JSON.stringify(userInfo), {
      expires: 7,
      path: '/',
      secure: window.location.protocol === 'https:'
    });
  }
}