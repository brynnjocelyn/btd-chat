export interface ListAuthMethodsResponse {
  usernamePassword: true;
  emailPassword: true;
  authProviders: AuthProvider[];
}

export interface AuthProvider {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
}
