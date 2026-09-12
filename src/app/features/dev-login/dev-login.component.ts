import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dev-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1e1e1e;">
      <div style="background:#2d2d2d;border:2px solid #f0a500;border-radius:8px;padding:32px;width:500px;color:#fff;font-family:monospace;">
        <h2 style="color:#f0a500;margin:0 0 8px 0;">⚙ Dev Bypass</h2>
        <p style="color:#aaa;margin:0 0 24px 0;font-size:13px;">Ambiente de desenvolvimento. Cole o access token para autenticar.</p>

        <label style="display:block;margin-bottom:6px;font-size:13px;color:#ccc;">Access Token</label>
        <textarea
          [(ngModel)]="token"
          rows="6"
          placeholder="Cole o token aqui..."
          style="width:100%;background:#1e1e1e;border:1px solid #555;border-radius:4px;color:#fff;padding:10px;font-size:12px;resize:vertical;box-sizing:border-box;"
        ></textarea>

        <button
          (click)="applyToken()"
          [disabled]="!token.trim()"
          style="margin-top:16px;width:100%;padding:12px;background:#f0a500;color:#1e1e1e;border:none;border-radius:4px;font-size:14px;font-weight:bold;cursor:pointer;">
          Aplicar Token e Entrar
        </button>

        <div *ngIf="message" style="margin-top:12px;padding:8px;border-radius:4px;" [style.background]="success ? '#1a4a1a' : '#4a1a1a'" [style.color]="success ? '#6dbe6d' : '#e57373'">
          {{ message }}
        </div>
      </div>
    </div>
  `
})
export class DevLoginComponent implements OnInit {
  token = '';
  message = '';
  success = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    if (!environment.devBypass) {
      this.router.navigate(['/login']);
      return;
    }

    // Suporte a /dev-login?token=xxx para aplicar diretamente via URL
    const tokenFromUrl = this.route.snapshot.queryParams['token'];
    if (tokenFromUrl) {
      this.token = tokenFromUrl;
      this.applyToken();
    }
  }

  applyToken(): void {
    const t = this.token.trim();
    if (!t) return;

    // Salva no cookie (usado pelo interceptor) e no localStorage (fallback)
    this.cookieService.set('access_token', t, { expires: 1, path: '/' });
    localStorage.setItem('dev_access_token', t);

    this.success = true;
    this.message = 'Token aplicado! Redirecionando...';

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cafeterias';
    setTimeout(() => this.router.navigate([returnUrl]), 800);
  }
}
