export const authConfig = {
  clientId: 'fitness-tracker-frontend',
  authorizationEndpoint: 'http://localhost:8181/realms/fitness-tracker-app/protocol/openid-connect/auth',
  tokenEndpoint: 'http://localhost:8181/realms/fitness-tracker-app/protocol/openid-connect/token',
  redirectUri: 'http://localhost:3000/callback',
  logoutEndpoint: 'http://localhost:8181/realms/fitness-tracker-app/protocol/openid-connect/logout',
  logoutRedirect: 'http://localhost:3000',
  scope: 'openid profile email offline_access',
  onRefreshTokenExpire: (event) => event.logIn()
}
