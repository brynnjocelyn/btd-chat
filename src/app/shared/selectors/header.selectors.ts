import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeaderState } from '../state/reducers/header.reducer';

export const selectHeaderState = createFeatureSelector<HeaderState>('header');

export const selectHeaderTitle = createSelector(
  selectHeaderState,
  (state) => state.title,
);
