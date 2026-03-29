import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/oauth.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ResultLoginModel } from 'src/app/shared/models/login.model';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { GoogleUserInfo } from 'src/app/shared/types/google-identity-services';

// Cliente JWT decoder para decodificar o token do Google
function parseJWT(token: string): GoogleUserInfo | null {
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
    return JSON.parse(jsonPayload) as GoogleUserInfo;
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="spinner" *ngIf="isProcessing">
        <div class="loading-text">Processando login...</div>
      </div>
      <div class="error-message" *ngIf="errorMessage">
        <p>{{errorMessage}}</p>
        <button (click)="redirectToLogin()" class="btn btn-primary">Voltar ao Login</button>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .loading-text {
      text-align: center;
      font-size: 18px;
    }
    .error-message {
      text-align: center;
    }
    .btn {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class OAuthCallbackComponent implements OnInit {
  isProcessing = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    console.log('=== GIS CALLBACK COMPONENT LOADED ===');
    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('Hash:', window.location.hash);
    
    this.processGoogleCallback();
  }

  private processGoogleCallback(): void {
    console.log('=== GIS CALLBACK ===');
    
    // Obtém o credential dos query params (enviado pelo AuthService)
    const credential = this.route.snapshot.queryParams['credential'];
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    
    if (!credential) {
      console.log('No credential found in URL params');
      this.errorMessage = 'Token de autenticação não encontrado.';
      this.isProcessing = false;
      return;
    }

    try {
      // Decodifica o JWT token do Google
      const userInfo: GoogleUserInfo | null = parseJWT(credential);
      
      if (!userInfo) {
        throw new Error('Failed to decode Google credential');
      }

      console.log('✓ Google credential decoded:', userInfo);

      // Armazena as informações do usuário no AuthService
      this.authService.setUserInfo(userInfo);

      // Chama o doLogin
      this.callDoLogin(userInfo, returnUrl);

    } catch (error) {
      console.error('✗ Error processing Google credential:', error);
      this.errorMessage = 'Erro ao processar credenciais do Google. Tente novamente.';
      this.isProcessing = false;
    }
  }

  private callDoLogin(userInfo: GoogleUserInfo, returnUrl: string): void {
    console.log('=== CALLING DO LOGIN ===');
    
    try {
      if (!userInfo.email || !userInfo.name) {
        throw new Error('Dados do usuário do Google incompletos');
      }

      // Mapeia para o formato esperado pelo doLogin
      const nameParts = userInfo.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const loginData: ResultLoginModel = {
        Id: userInfo.sub, // Google user ID
        Email: userInfo.email,
        FirstName: firstName,
        LastName: lastName,
        Photo: userInfo.picture || ''
      };

      console.log('Calling doLogin with data:', loginData);

      // Chama o doLogin do backend
      this.loginService.doLogin(loginData).subscribe({
        next: (response) => {
          console.log('✓ DoLogin successful:', response);
          
          // Armazena o token do backend se fornecido
          if (response.token) {
            this.cookieService.set('access_token', response.token, { 
              expires: 7, // 7 dias
              path: '/',
              secure: window.location.protocol === 'https:'
            });
            console.log('✓ Backend token stored');
          }

          // Redireciona para a URL apropriada
          console.log(`✓ Redirecting to: ${returnUrl}`);
          this.isProcessing = false;
          this.router.navigate([returnUrl]);
        },
        error: (error) => {
          console.error('✗ DoLogin failed:', error);
          this.errorMessage = 'Erro ao processar login no servidor. Tente novamente.';
          this.isProcessing = false;
        }
      });

    } catch (error) {
      console.error('✗ Error processing user data:', error);
      this.errorMessage = 'Erro ao obter dados do usuário. Tente novamente.';
      this.isProcessing = false;
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}