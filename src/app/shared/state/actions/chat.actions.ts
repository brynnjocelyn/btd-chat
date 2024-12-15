import { createActionGroup, props } from '@ngrx/store';

export const ChatActions = createActionGroup({
  source: 'Chat',
  events: {
    setSelectedChatAction: props<{
      id: string;
      userProfileImage: string;
      userName: string;
    }>(),
  },
});

export const { setSelectedChatAction } = ChatActions;
