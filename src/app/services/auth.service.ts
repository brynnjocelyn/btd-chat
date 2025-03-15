import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAuthLoading,
  selectIsAuthenticated,
  selectResetPasswordSuccessFlag,
  selectRegisterSuccessFlag,
  selectAvailableAuthMethods,
} from '../shared/state/selectors/auth.selectors';
import { Observable } from 'rxjs';
import {
  setLoadingAction,
  setAuthStatus,
  login,
  logout,
  register,
  sendResetPasswordEmail,
  resetPassword,
  refreshToken,
  resetPasswordSuccess,
  loadAvailableAuthMethodsAction,
  loginWithProviderAction,
} from '../shared/state/actions/auth.actions';
import { ListAuthMethodsResponse } from '../shared/api/list-auth-methods-response';
import { RegisterWithOAuthRequest } from '../shared/api/register-with-oauth-request';
import { pb } from '../shared/pocketbase/pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store) {
    console.log('AuthService constructor');
    this.setAuthStatus(pb.authStore.isValid);

    pb.authStore.onChange(() => {
      const isAuthenticated = pb.authStore.isValid;
      this.setAuthStatus(isAuthenticated);
    });
  }

  // Dispatchers
  loadAvailableAuthMethods(): void {
    this.store.dispatch(loadAvailableAuthMethodsAction());
  }
  setLoading(isLoading: boolean): void {
    this.store.dispatch(setLoadingAction({ isLoading }));
  }

  setAuthStatus(isAuthenticated: boolean): void {
    this.store.dispatch(setAuthStatus({ isAuthenticated }));
  }

  login(email: string, password: string): void {
    this.store.dispatch(login({ email, password }));
  }

  loginWithProvider(
    providerInfo: Omit<RegisterWithOAuthRequest, 'createData'>,
  ): void {
    // await pb.collection('users').authWithOAuth2({ provider: providerInfo.provider });
    this.store.dispatch(loginWithProviderAction({ providerInfo }));
  }

  logout(): void {
    pb.authStore.clear();
    this.store.dispatch(logout());
  }

  register(email: string, password: string, passwordConfirm: string): void {
    this.store.dispatch(register({ email, password, passwordConfirm }));
  }

  sendResetPasswordEmail(email: string): void {
    this.store.dispatch(sendResetPasswordEmail({ email }));
  }

  resetPassword(
    token: string,
    password: string,
    passwordConfirm: string,
  ): void {
    this.store.dispatch(resetPassword({ token, password, passwordConfirm }));
  }

  refreshToken(token: string): void {
    this.store.dispatch(refreshToken({ token }));
  }

  setResetPasswordSuccessFlag(): void {
    this.store.dispatch(resetPasswordSuccess());
  }

  // Selectors
  getLoadingStatus(): Observable<boolean> {
    return this.store.select(selectAuthLoading);
  }
  getAuthStatus(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }
  getResetPasswordSuccessFlag(): Observable<boolean> {
    return this.store.select(selectResetPasswordSuccessFlag);
  }
  getRegistrationSuccessFlag(): Observable<boolean> {
    return this.store.select(selectRegisterSuccessFlag);
  }
  getAvailableAuthMethods(): Observable<ListAuthMethodsResponse | null> {
    return this.store.select(selectAvailableAuthMethods);
  }
}
