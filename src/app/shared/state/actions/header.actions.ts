import { createAction, props } from '@ngrx/store';

export const setHeaderTitleAction = createAction(
  '[Header] Set Title',
  props<{ title: string }>(),
);
