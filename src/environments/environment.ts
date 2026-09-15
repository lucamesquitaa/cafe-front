export const environment = {
  production: false,
  devBypass: true,
  apiBaseUrl: 'http://localhost:8080',
  oauth: {
    googleClientId: '1065342845217-8hvbkbaf625ac8l0kr66dqbcqhnooqml.apps.googleusercontent.com',
    redirectUri: 'http://localhost:4200/oauth-callback',
    postLogoutRedirectUri: 'http://localhost:4200/login',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html'
  }
};