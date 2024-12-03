import { createReducer, on } from '@ngrx/store';
import { setHeaderTitleAction } from '../actions/header.actions';

export interface HeaderState {
  title: string;
}

export const initialState: HeaderState = {
  title: 'Header',
};

export const headerReducer = createReducer(
  initialState,
  on(setHeaderTitleAction, (state, { title }) => ({
    ...state,
    title,
  })),
);
