export const environment = {
  production: false,
  devBypass: true,
  apiBaseUrl: '',
  oauth: {
    redirectUri: 'http://localhost:4200/oauth-callback',
    postLogoutRedirectUri: 'http://localhost:4200/login',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html'
  }
};