import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAuthLoading,
  selectIsAuthenticated,
  selectResetPasswordSuccessFlag,
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
} from '../shared/state/actions/auth.actions';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  pb: PocketBase;

  constructor(private store: Store) {
    console.log('AuthService constructor');
    this.pb = new PocketBase(environment.pbBaseUrl); // Replace with your Pocketbase URL
    this.setAuthStatus(this.pb.authStore.isValid);

    this.pb.authStore.onChange(() => {
      const isAuthenticated = this.pb.authStore.isValid;
      this.setAuthStatus(isAuthenticated);
    });
  }

  // Dispatchers
  setLoading(isLoading: boolean): void {
    this.store.dispatch(setLoadingAction({ isLoading }));
  }

  setAuthStatus(isAuthenticated: boolean): void {
    this.store.dispatch(setAuthStatus({ isAuthenticated }));
  }

  login(email: string, password: string): void {
    this.store.dispatch(login({ email, password }));
  }

  logout(): void {
    this.pb.authStore.clear();
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
}
