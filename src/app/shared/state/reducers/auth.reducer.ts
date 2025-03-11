import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  setLoadingAction,
  setAuthStatus,
  resetPasswordSuccess,
  setPasswordReset,
  registerSuccess,
  loadAvailableAuthMethodsSuccessAction,
} from '../actions/auth.actions';
import { AuthenticatedUserRecord } from '../../api/auth-with-password-response';
import { ListAuthMethodsResponse } from '../../api/list-auth-methods-response';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
  record: Partial<AuthenticatedUserRecord> | null;
  passwordResetSuccessFlag: boolean;
  registerSuccess: boolean;
  availableAuthMethods: ListAuthMethodsResponse | null;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: '',
  record: null,
  passwordResetSuccessFlag: false,
  registerSuccess: false,
  availableAuthMethods: null,
};

export const authReducer = createReducer(
  initialState,
  on(setLoadingAction, (state, { isLoading }) => {
    return { ...state, isLoading };
  }),
  on(login, (state) => {
    return { ...state, isLoading: true };
  }),
  on(loginSuccess, (state, { token, record }) => {
    return { ...state, isLoading: false, isAuthenticated: true, token, record };
  }),
  on(loginFailure, (state) => {
    return { ...state, isLoading: false, isAuthenticated: false };
  }),
  on(setAuthStatus, (state, { isAuthenticated }) => {
    return { ...state, isAuthenticated };
  }),
  on(resetPasswordSuccess, (state) => {
    return { ...state, passwordResetSuccessFlag: true };
  }),
  on(setPasswordReset, (state, { passwordReset }) => {
    return { ...state, passwordResetSuccessFlag: passwordReset };
  }),
  on(registerSuccess, (state, { newUser }) => {
    return { ...state, registerSuccess: true, record: newUser };
  }),
  on(loadAvailableAuthMethodsSuccessAction, (state, { methods }) => {
    return { ...state, availableAuthMethods: methods };
  }),
);
