export interface ListAuthMethodsResponse {
  usernamePassword: boolean;
  emailPassword: boolean;
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
