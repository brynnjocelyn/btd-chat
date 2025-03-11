import { createActionGroup, emptyProps, props } from '@ngrx/store';
import PocketBase from 'pocketbase';
import {
  AuthWithPasswordResponse,
  AuthenticatedUserRecord,
} from '../../api/auth-with-password-response';
import { PBErrorResponse } from '../../api/pb-error-response';
import { ListAuthMethodsResponse } from '../../api/list-auth-methods-response';
import { LoginWithProviderResponse } from '../../api/login-with-provider-response';
import { RegisterWithOAuthRequest } from '../../api/register-with-oauth-request';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    setLoadingAction: props<{ isLoading: boolean }>(),

    setAuthStatus: props<{ isAuthenticated: boolean }>(),

    // Login
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<AuthWithPasswordResponse>(),
    loginFailure: props<{ error: PBErrorResponse }>(),

    // Logout
    logout: emptyProps(),
    logoutSuccess: emptyProps(),
    logoutFailure: props<{ error: PBErrorResponse }>(),

    // Register
    register: props<{
      email: string;
      password: string;
      passwordConfirm: string;
    }>(),
    registerSuccess: props<{ newUser: Partial<AuthenticatedUserRecord> }>(),
    registerFailure: props<{ error: PBErrorResponse }>(),

    // SendResetPasswordEmail
    sendResetPasswordEmail: props<{ email: string }>(),
    sendResetPasswordEmailSuccess: props<{ email: string }>(),
    sendResetPasswordEmailFailure: props<{ error: PBErrorResponse }>(),

    // ResetPassword
    resetPassword: props<{
      token: string;
      password: string;
      passwordConfirm: string;
    }>(),
    resetPasswordSuccess: emptyProps(),
    resetPasswordFailure: props<{ error: PBErrorResponse }>(),

    // RefreshToken
    refreshToken: props<{ token: string }>(),
    refreshTokenSuccess: props<AuthWithPasswordResponse>(),
    refreshTokenFailure: props<{ error: PBErrorResponse }>(),

    setPasswordReset: props<{ passwordReset: boolean }>(),

    // SendEmailVerificationRequest
    sendEmailVerificationRequest: props<{ email: string }>(),
    sendEmailVerificationRequestSuccess: emptyProps(),
    sendEmailVerificationRequestFailure: props<{ error: PBErrorResponse }>(),

    setResetPasswordSuccessFlag: props<{ success: boolean }>(),

    // LoadAvailableAuthMethods: emptyProps(),
    loadAvailableAuthMethodsAction: emptyProps(),
    loadAvailableAuthMethodsSuccessAction: props<{
      methods: ListAuthMethodsResponse;
    }>(),
    loadAvailableAuthMethodsFailureAction: props<{ error: PBErrorResponse }>(),

    // LoginWithProvider
    loginWithProviderAction: props<{
      providerInfo: Omit<RegisterWithOAuthRequest, 'createData'>;
      pb: PocketBase;
    }>(),
    loginWithProviderSuccess: props<LoginWithProviderResponse>(),
    loginWithProviderFailure: props<{ error: PBErrorResponse }>(),
  },
});

export const {
  setLoadingAction,
  setAuthStatus,
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutFailure,
  logoutSuccess,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure,
  sendResetPasswordEmail,
  sendResetPasswordEmailSuccess,
  sendResetPasswordEmailFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  register,
  registerSuccess,
  registerFailure,
  setPasswordReset,
  sendEmailVerificationRequest,
  sendEmailVerificationRequestSuccess,
  sendEmailVerificationRequestFailure,
  setResetPasswordSuccessFlag,
  loadAvailableAuthMethodsAction,
  loadAvailableAuthMethodsSuccessAction,
  loadAvailableAuthMethodsFailureAction,
  loginWithProviderAction,
  loginWithProviderSuccess,
  loginWithProviderFailure,
} = AuthActions;
