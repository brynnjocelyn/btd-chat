import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated,
);

export const selectResetPasswordSuccessFlag = createSelector(
  selectAuthState,
  (state) => state.passwordResetSuccessFlag,
);

export const selectRegisterSuccessFlag = createSelector(
  selectAuthState,
  (state) => state.registerSuccess,
);

export const selectAvailableAuthMethods = createSelector(
  selectAuthState,
  (state) => state.availableAuthMethods,
);
