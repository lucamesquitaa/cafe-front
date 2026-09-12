import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { environment } from 'src/environments/environment';

const devRoutes: Routes = environment.devBypass ? [
  {
    path: 'dev-login',
    loadComponent: () => import('./features/dev-login/dev-login.component').then(m => m.DevLoginComponent)
  }
] : [];

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'oauth-callback',
    loadComponent: () => import('./features/oauth-callback/oauth-callback.component').then(m => m.OAuthCallbackComponent)
  },
  ...devRoutes,
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'cafeterias',
    loadChildren: () =>
      import('./features/cafeterias/cafeterias.module').then(m => m.CafeteriasModule),
    canActivate: [AuthGuard],
  },
];
