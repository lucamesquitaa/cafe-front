//interceptor

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService, private router: Router, private toastr: ToastrService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Ignorar requisições para Google ou OAuth
        const ignoreUrls = ['google', 'oauth'];
        if (ignoreUrls.some(url => req.url.includes(url))) {
            return next.handle(req);
        }

        const token = this.getValidToken();
        
        // Se não há token válido e a requisição é para uma URL que precisa de autenticação
        if (!token && this.requiresAuth(req.url) && !environment.devBypass) {
            this.toastr.warning('Você precisa fazer login para acessar esta funcionalidade.', 'Login Necessário');
            this.router.navigate(['/login']);
            return throwError(new HttpErrorResponse({ status: 401, statusText: 'No token available' }));
        }

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(cloned).pipe(
                catchError((error: HttpErrorResponse) => this.handleAuthError(error))
            );
        } else {
            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => this.handleAuthError(error))
            );
        }
    }

    private getValidToken(): string | null {
        // Primeiro verifica no cookie
        let token = this.cookieService.get('access_token');

        // Se não encontrou no cookie, verifica no sessionStorage
        if (!token) {
            token = sessionStorage.getItem('access_token') || sessionStorage.getItem('id_token') || '';
        }

        // Em modo dev bypass, usa o token do localStorage se existir
        if (!token && environment.devBypass) {
            token = localStorage.getItem('dev_access_token') || '';
        }

        // Verifica se o token expirou (ignora em modo dev bypass)
        if (token && !environment.devBypass && this.isTokenExpired()) {
            this.clearAllTokens();
            this.toastr.warning('Sua sessão expirou. Faça login novamente.', 'Sessão Expirada');
            this.router.navigate(['/login']);
            return null;
        }

        return token || null;
    }

    private isTokenExpired(): boolean {
        const expiresAt = sessionStorage.getItem('id_token_expires_at');
        if (!expiresAt) return false;
        
        const expirationTime = parseInt(expiresAt);
        const currentTime = Date.now();
        
        return currentTime >= expirationTime;
    }

    private clearAllTokens(): void {
        // Limpar tokens dos cookies
        this.cookieService.delete('access_token');
        
        // Limpar tokens do sessionStorage
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('id_token_expires_at');
        sessionStorage.removeItem('refresh_token');
    }

    private requiresAuth(url: string): boolean {
        // URLs que NÃO precisam de autenticação
        const publicUrls = [
            '/login',
            '/register',
            '/public',
            'google',
            'oauth'
        ];
        
        // Se a URL contém alguma das URLs públicas, não precisa de auth
        return !publicUrls.some(publicUrl => url.toLowerCase().includes(publicUrl.toLowerCase()));
    }

    private handleAuthError(error: HttpErrorResponse): Observable<never> {
        // Verificar se é erro 401 (não autorizado) ou token expirado
        if (error.status === 401 || 
            error.error?.message?.toLowerCase().includes('token expired') ||
            error.error?.message?.toLowerCase().includes('token expirado') ||
            error.error?.message?.toLowerCase().includes('unauthorized')) {
            
            // Limpar todos os tokens
            this.clearAllTokens();
            
            // Mostrar mensagem para o usuário
            this.toastr.warning('Sua sessão expirou. Faça login novamente.', 'Sessão Expirada');
            
            // Redirecionar para a página de login
            this.router.navigate(['/login']);
        }
        
        return throwError(error);
    }
}