import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule, NgbDropdownModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ROUTES } from './app.routes'
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './shared/services/interceptor';
import { MockApiInterceptor } from './shared/services/mock-api.interceptor';
import { AuthService } from './shared/services/oauth.service';

// Função para inicializar Google Identity Services
export function initializeGoogleAuth(authService: AuthService): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      // Aguarda o carregamento do script do Google
      if (window.google) {
        authService.initializeGoogleAuth().then(() => {
          resolve();
        }).catch(() => {
          console.warn('Google Identity Services initialization failed');
          resolve(); // Não bloqueia a aplicação se falhar
        });
      } else {
        // Aguarda um pouco mais tempo para o script carregar
        setTimeout(() => {
          if (window.google) {
            authService.initializeGoogleAuth().then(() => {
              resolve();
            }).catch(() => {
              console.warn('Google Identity Services initialization failed');
              resolve();
            });
          } else {
            console.warn('Google Identity Services script not loaded');
            resolve();
          }
        }, 1000);
      }
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    NgbDropdownModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    NgbDropdown,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeGoogleAuth,
      deps: [AuthService],
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
