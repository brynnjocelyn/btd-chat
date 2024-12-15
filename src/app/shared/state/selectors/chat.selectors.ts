import { createFeatureSelector, createSelector } from '@ngrx/store';

import { chatFeatureKey, ChatState } from '../reducers/chat.reducer';

export const selectChatState = createFeatureSelector<ChatState>(chatFeatureKey);

export const selectSelectedChat = createSelector(
  selectChatState,
  (state) => state.selectedChat,
);
