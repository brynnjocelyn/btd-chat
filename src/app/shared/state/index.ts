import { ActionReducerMap } from '@ngrx/store';
import { HeaderState, headerReducer } from './reducers/header.reducer';

export interface AppState {
  // tabs: TabState;
  header: HeaderState;
  // footer: FooterState;
  // home: HomeState;
}

export const reducers: ActionReducerMap<AppState> = {
  // tabs: tabsReducer,
  header: headerReducer,
  // footer: footerReducer,
  // home: homeReducer,
};
