import { createReducer, on } from '@ngrx/store';
import { setSelectedChatAction } from '../actions/chat.actions';

export const chatFeatureKey = 'chat';

export interface ChatState {
  selectedChat?: {
    id: string;
    userProfileImage: string;
    userName: string;
  } | null;
}

export const initialState: ChatState = {
  selectedChat: null,
};

export const chatReducer = createReducer(
  initialState,
  on(setSelectedChatAction, (state, action) => {
    return { ...state, selectedChat: action };
  }),
);
