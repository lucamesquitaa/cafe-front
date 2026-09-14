import { Component, Injector, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { AuthService } from 'src/app/shared/services/oauth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ComponentBase implements OnInit, AfterViewInit {
  returnUrl: string = '';
  readonly devBypass = environment.devBypass;
  @ViewChild('googleButton', { static: false }) googleButton!: ElementRef;

  constructor(
    public override injector: Injector, 
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  override ngOnInit() {
    // Verifica se já está logado
    if (this.authService.isAuthenticated()) {
      console.log('User already authenticated, redirecting to cafeterias');
      this.router.navigate(['/cafeterias']);
      return;
    }

    // Obtém returnUrl dos query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cafeterias';

    // Inicializa o Google Auth
    this.initializeGoogleAuth();
  }

  ngAfterViewInit() {
    // Renderiza o botão do Google após a view estar pronta
    setTimeout(() => {
      this.renderGoogleButton();
    }, 100);
  }

  /**
   * Inicializa Google Identity Services
   */
  private async initializeGoogleAuth(): Promise<void> {
    try {
      await this.authService.initializeGoogleAuth();
      console.log('✓ Google Auth initialized in login component');
    } catch (error) {
      console.error('Error initializing Google Auth:', error);
    }
  }

  /**
   * Renderiza o botão do Google
   */
  private renderGoogleButton(): void {
    if (this.googleButton && this.googleButton.nativeElement) {
      this.authService.renderGoogleButton(this.googleButton.nativeElement, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: '100%'
      });
    }
  }

  /**
   * Inicia o processo de login via Google Identity Services
   */
  loginWithGoogle(): void {
    this.authService.login();
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    console.log('Logging out user');
    // Limpa tokens do OAuth
    this.authService.logout();
    
    // Limpa storage local
    sessionStorage.clear();
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('nonce');
    localStorage.removeItem('PKCE_verifier');
    this.cookieService.deleteAll();
    
    // Redireciona para login
    this.router.navigate(['/login']);
  }
}
