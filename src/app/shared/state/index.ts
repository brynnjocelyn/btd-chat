import { ActionReducerMap } from '@ngrx/store';
import { HeaderState, headerReducer } from './reducers/header.reducer';
import { ChatState, chatReducer } from './reducers/chat.reducer';

export interface AppState {
  // tabs: TabState;
  header: HeaderState;
  chat: ChatState;
  // footer: FooterState;
  // home: HomeState;
}

export const reducers: ActionReducerMap<AppState> = {
  // tabs: tabsReducer,
  header: headerReducer,
  chat: chatReducer,
  // footer: footerReducer,
  // home: homeReducer,
};
