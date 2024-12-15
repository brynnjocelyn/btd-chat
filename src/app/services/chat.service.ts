import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSelectedChatAction } from '../shared/state/actions/chat.actions';
import { selectSelectedChat } from '../shared/state/selectors/chat.selectors';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private store: Store) {}

  // ACTIONS
  setSelectedChat(payload: {
    id: string;
    userProfileImage: string;
    userName: string;
  }) {
    this.store.dispatch(setSelectedChatAction(payload));
  }

  // SELECTORS
  getSelectedChat() {
    return this.store.select(selectSelectedChat);
  }
}
