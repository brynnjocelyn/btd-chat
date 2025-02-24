import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthWithPasswordResponse } from '../shared/api/auth-with-password-response';
import { ListAuthMethodsResponse } from '../shared/api/list-auth-methods-response';
import { registerWithOAuthRequest } from '../shared/api/register-with-oauth-request';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  pbBaseUrl = environment.pbBaseUrl;

  constructor(private http: HttpClient) {}

  loginWithOAuth2(
    payload: registerWithOAuthRequest,
  ): Observable<AuthWithPasswordResponse> {
    return this.http.post<AuthWithPasswordResponse>(
      `${this.pbBaseUrl}/api/collecitons/users/auth-with-oauth2`,
      payload,
    );
  }

  /*
   * Returns new auth token and account data by a combination of username/email and password.
   */
  loginWithPassword(
    email: string,
    password: string,
  ): Observable<AuthWithPasswordResponse> {
    return this.http.post<AuthWithPasswordResponse>(
      `${this.pbBaseUrl}/api/collecitons/users/auth-with-password`,
      { identity: email, password },
    );
  }

  /*
   * Create a new users record.
   *
   * Body parameters could be sent as application/json or multipart/form-data.
   *
   * File upload is supported only via multipart/form-data.
   *
   * This method creates a new record and returns a new auth token and record data.
   */
  registerWithPassword(
    email: string,
    password: string,
    passwordConfirm: string,
  ): Observable<AuthWithPasswordResponse> {
    const body = {
      email,
      password,
      passwordConfirm,
    };
    return this.http.post<AuthWithPasswordResponse>(
      `${this.pbBaseUrl}/api/collecitons/users/register-with-password`,
      body,
    );
  }

  /*
   * Sends users verification email request.
   */
  requestEmailVerification(email: string): Observable<null> {
    return this.http.post<null>(
      `${this.pbBaseUrl}/api/collecitons/users/request-verification`,
      { email },
    );
  }

  /*
   * Confirms users email verification request.
   */
  confirmEmailVerification(token: string): Observable<null> {
    return this.http.post<null>(
      `${this.pbBaseUrl}/api/collecitons/users/confirm-verification`,
      { token },
    );
  }

  /*
   * Requests a password reset for a specific record.
   *
   * This method sends an email to the user with a link to confirm the password reset.
   */
  requestResetPassword(email: string): Observable<null> {
    return this.http.post<null>(
      `${this.pbBaseUrl}/api/collections/users/request-password-reset`,
      { email },
    );
  }

  /*
   * Confirms users password reset request and sets a new password.
   *
   * After this request all previously issued tokens for the specific record will be automatically invalidated.
   */
  confirmResetPassword(
    authToken: string,
    password: string,
    passwordConfirm: string,
  ): Observable<null> {
    return this.http.post<null>(
      `${this.pbBaseUrl}/api/collecitons/users/confirm-password-reset`,
      { authToken, password, passwordConfirm },
    );
  }

  /*
   * Returns a new auth response (token and record data) for an already authenticated record.
   *
   * This method is usually called by users on page/screen reload to ensure that the previously stored data in pb.authStore is still valid and up-to-date.
   *
   * Requires Authorization:TOKEN header
   */
  refreshToken(token: string): Observable<AuthWithPasswordResponse> {
    const headers = new HttpHeaders().set('Authorization', `TOKEN ${token}`);
    return this.http.post<AuthWithPasswordResponse>(
      `${this.pbBaseUrl}/api/collecitons/users/auth-refresh`,
      { token },
      { headers },
    );
  }

  /*
   * Sends users email change request.
   */
  requestEmailChange(newEmail: string, token: string): Observable<null> {
    const headers = new HttpHeaders().set('Authorization', `TOKEN ${token}`);
    return this.http.post<null>(
      `${this.pbBaseUrl}/api/collecitons/users/request-email-change`,
      { newEmail },
      { headers },
    );
  }

  /*
   * Confirms users email change request.
   *
   * @param token - The token from the change email request email.
   * @param password - The account password to confirm the email change.
   */
  confirmEmailChange(token: string, password: string): Observable<null> {
    return this.http.post<null>(
      `${this.pbBaseUrl}/api/collecitons/users/confirm-email-change`,
      { token, password },
    );
  }

  /*
   * Returns a public list with all allowed users authentication methods.
   */
  listAuthMethods(): Observable<ListAuthMethodsResponse> {
    return this.http.get<ListAuthMethodsResponse>(
      `${this.pbBaseUrl}/api/collecitons/users/auth-methods`,
    );
  }

  /*
   * Returns a list with all OAuth2 providers linked to a single users.
   *
   * Only admins and the account owner can access this action.
   *
   * Requires Authorization:TOKEN header
   */
  listOAuth2Accounts(id: string, token: string): Observable<null> {
    const headers = new HttpHeaders().set('Authorization', `TOKEN ${token}`);
    return this.http.get<null>(
      `${this.pbBaseUrl}/api/collecitons/users/records/${id}/external-auths`,
      { headers },
    );
  }

  /*
   * Unlink a single external OAuth2 provider from users record.
   *
   * Only admins and the account owner can access this action.
   *
   * Requires Authorization:TOKEN header
   */
  unlinkOAuth2Account(id: string, provider: string): Observable<null> {
    return this.http.delete<null>(
      `${this.pbBaseUrl}/api/collecitons/users/records/${id}/external-auths/${provider}`,
    );
  }
}
