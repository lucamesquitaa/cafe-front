export const environment = {
  production: true,
  devBypass: false,
  apiBaseUrl: 'https://api.turify.com.br',
  oauth: {
    googleClientId: '', // TODO: preencher com o mesmo Client ID configurado em Authentication:Google:ClientId no backend de produção
    redirectUri: 'https://turify.com.br/admin',  // Ajustado para match do Google Console
    postLogoutRedirectUri: 'https://turify.com.br/login',
    silentRefreshRedirectUri: 'https://turify.com.br/silent-refresh.html'
  }
};
