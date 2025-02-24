import { ActionReducerMap } from '@ngrx/store';
import { HeaderState, headerReducer } from './reducers/header.reducer';
import { ChatState, chatReducer } from './reducers/chat.reducer';
import { AuthState, authReducer } from './reducers/auth.reducer';

export interface AppState {
  auth: AuthState;
  // tabs: TabState;
  header: HeaderState;
  chat: ChatState;
  // footer: FooterState;
  // home: HomeState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // tabs: tabsReducer,
  header: headerReducer,
  chat: chatReducer,
  // footer: footerReducer,
  // home: homeReducer,
};
