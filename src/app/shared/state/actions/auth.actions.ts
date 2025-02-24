import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthWithPasswordResponse } from '../../api/auth-with-password-response';
import { PBErrorResponse } from '../../api/pb-error-response';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    setLoadingAction: props<{ isLoading: boolean }>(),
    setAuthStatus: props<{ isAuthenticated: boolean }>(),
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<AuthWithPasswordResponse>(),
    loginFailure: props<{ error: PBErrorResponse }>(),
    logout: emptyProps(),
    logoutSuccess: emptyProps(),
    logoutFailure: props<{ error: PBErrorResponse }>(),
    register: props<{
      email: string;
      password: string;
      passwordConfirm: string;
    }>(),
    registerSuccess: props<{ email: string }>(),
    registerFailure: props<{ error: PBErrorResponse }>(),
    sendResetPasswordEmail: props<{ email: string }>(),
    sendResetPasswordEmailSuccess: props<{ email: string }>(),
    sendResetPasswordEmailFailure: props<{ error: PBErrorResponse }>(),
    resetPassword: props<{
      token: string;
      password: string;
      passwordConfirm: string;
    }>(),
    resetPasswordSuccess: emptyProps(),
    resetPasswordFailure: props<{ error: PBErrorResponse }>(),
    refreshToken: props<{ token: string }>(),
    refreshTokenSuccess: props<AuthWithPasswordResponse>(),
    refreshTokenFailure: props<{ error: PBErrorResponse }>(),
    setPasswordReset: props<{ passwordReset: boolean }>(),
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
} = AuthActions;
