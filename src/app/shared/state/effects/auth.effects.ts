import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import {
  switchMap,
  map,
  catchError,
  of,
  EMPTY,
  delay,
  mergeMap,
  from,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutFailure,
  logoutSuccess,
  register,
  registerFailure,
  registerSuccess,
  sendResetPasswordEmail,
  sendResetPasswordEmailSuccess,
  sendResetPasswordEmailFailure,
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
  setPasswordReset,
  sendEmailVerificationRequest,
  sendEmailVerificationRequestSuccess,
  sendEmailVerificationRequestFailure,
  loadAvailableAuthMethodsAction,
  loadAvailableAuthMethodsFailureAction,
  loadAvailableAuthMethodsSuccessAction,
  loginWithProviderAction,
} from '../actions/auth.actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpService } from 'src/app/services/http.service';
import { PBErrorResponse } from '../../api/pb-error-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  pb: PocketBase;

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.httpService.loginWithPassword(email, password).pipe(
          map(({ token, record }) => loginSuccess({ token, record })),
          catchError((error: PBErrorResponse) => of(loginFailure({ error }))),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        of(EMPTY).pipe(
          map(() => {
            return logoutSuccess();
          }),
          catchError((error) => of(logoutFailure({ error }))),
        ),
      ),
    ),
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        switchMap(() => {
          console.log('Logged out');
          this.router.navigate(['/login']);
          return of(EMPTY);
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ email, password, passwordConfirm }) =>
        this.httpService
          .registerWithPassword(email, password, passwordConfirm)
          .pipe(
            mergeMap((newUser) => [
              registerSuccess({ newUser }), // Save the new user record to the state
              sendEmailVerificationRequest({ email: newUser.email }), // Send an email verification request
            ]),
            catchError((error) => of(registerFailure({ error }))),
          ),
      ),
    ),
  );

  requestResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendResetPasswordEmail),
      switchMap(({ email }) =>
        this.httpService.requestResetPassword(email).pipe(
          map(() => {
            console.log('Password reset email sent');
            this.router.navigate(['/reset-password-request-sent', email]);
            return sendResetPasswordEmailSuccess({ email });
          }),
          catchError((error) => of(sendResetPasswordEmailFailure({ error }))),
        ),
      ),
    ),
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      switchMap(({ token, password, passwordConfirm }) =>
        this.httpService
          .confirmResetPassword(token, password, passwordConfirm)
          .pipe(
            map(() => {
              console.log('Password reset');
              return resetPasswordSuccess(); // This action will flip the passwordReset flag in the state and trigger a confirmation message
            }),
            catchError((error) => of(resetPasswordFailure({ error }))),
          ),
      ),
    ),
  );

  delayedSetPasswordReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordSuccess),
      delay(10000), // Wait 10 seconds (10000 milliseconds)
      map(() => {
        this.router.navigate(['/login']);
        return setPasswordReset({ passwordReset: false });
      }),
    ),
  );

  sendEmailVerificationRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendEmailVerificationRequest),
      switchMap(({ email }) =>
        this.httpService.requestEmailVerification(email).pipe(
          map(() => {
            console.log('Email verification request sent');
            return sendEmailVerificationRequestSuccess();
          }),
          catchError((error) =>
            of(sendEmailVerificationRequestFailure({ error })),
          ),
        ),
      ),
    ),
  );

  loadAvailableAuthMethods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAvailableAuthMethodsAction),
      switchMap(() =>
        this.httpService.listAuthMethods().pipe(
          map((methods) => loadAvailableAuthMethodsSuccessAction({ methods })),
          catchError((error) =>
            of(loadAvailableAuthMethodsFailureAction({ error })),
          ),
        ),
      ),
    ),
  );

  loginWithProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginWithProviderAction),
      switchMap(({ providerInfo, pb }) =>
        from(
          pb
            .collection('users')
            .authWithOAuth2({ provider: providerInfo.provider }),
        ).pipe(
          map(({ token, record }: { token: string; record: any }) =>
            loginSuccess({ token, record }),
          ),
          catchError((error) => of(loginFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private router: Router,
  ) {
    this.pb = new PocketBase(environment.pbBaseUrl);
  }
}
