import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/oauth.service';
import { GoogleUserInfo } from 'src/app/shared/types/google-identity-services';

const MOCK_USER: GoogleUserInfo = {
  iss: 'mock-login',
  sub: 'mock-user-id',
  name: 'Usuário Mock',
  given_name: 'Usuário',
  family_name: 'Mock',
  picture: 'https://i.pravatar.cc/150?u=mock-user',
  email: 'usuario.mock@teste.com',
  email_verified: true,
};

@Component({
  selector: 'app-mock-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1e1e1e;">
      <div style="background:#2d2d2d;border:2px solid #6dbe6d;border-radius:8px;padding:32px;width:420px;color:#fff;font-family:monospace;text-align:center;">
        <h2 style="color:#6dbe6d;margin:0 0 8px 0;">🧪 Mock Login</h2>
        <p style="color:#aaa;margin:0 0 24px 0;font-size:13px;">Ambiente de desenvolvimento. Entra direto usando dados mockados, sem precisar de token.</p>

        <button
          (click)="entrar()"
          style="width:100%;padding:12px;background:#6dbe6d;color:#1e1e1e;border:none;border-radius:4px;font-size:14px;font-weight:bold;cursor:pointer;">
          Entrar com usuário mock
        </button>

        <div *ngIf="message" style="margin-top:12px;padding:8px;border-radius:4px;background:#1a4a1a;color:#6dbe6d;">
          {{ message }}
        </div>
      </div>
    </div>
  `
})
export class MockLoginComponent implements OnInit {
  message = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!environment.devBypass) {
      this.router.navigate(['/login']);
      return;
    }

    this.entrar();
  }

  entrar(): void {
    // Autentica com usuário mockado (sem depender de token real de backend)
    this.authService.setUserInfo(MOCK_USER);
    this.cookieService.set('access_token', 'mock-access-token', { expires: 1, path: '/' });
    localStorage.setItem('dev_access_token', 'mock-access-token');

    this.message = 'Login mock aplicado! Redirecionando...';

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cafeterias';
    setTimeout(() => this.router.navigate([returnUrl]), 500);
  }
}
