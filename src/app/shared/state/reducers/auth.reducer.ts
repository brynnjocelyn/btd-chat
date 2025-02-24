import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  setLoadingAction,
  setAuthStatus,
  resetPasswordSuccess,
  setPasswordReset,
} from '../actions/auth.actions';
import { AuthenticatedUserRecord } from '../../api/auth-with-password-response';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
  record: AuthenticatedUserRecord | null;
  passwordReset: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: '',
  record: null,
  passwordReset: false,
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
    return { ...state, passwordReset: true };
  }),
  on(setPasswordReset, (state, { passwordReset }) => {
    return { ...state, passwordReset };
  }),
);
