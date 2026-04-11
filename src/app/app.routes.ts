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
    path: 'hotel',
    loadChildren: () =>
      import('./features/hotel/hotel.module').then(m => m.HotelModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./features/cadastro/cadastro.module').then(m => m.CadastroModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'managers',
    loadChildren: () =>
      import('./features/managers/managers.module').then(m => m.ManagersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'quartos',
    loadChildren: () =>
      import('./features/quartos/quartos.module').then(m => m.QuartosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'campos',
    loadChildren: () =>
      import('./features/campos/campos.module').then(m => m.CamposModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'motor',
    loadChildren: () =>
      import('./features/motor/motor.module').then(m => m.MotorModule),
    canActivate: [AuthGuard],
  },
];
