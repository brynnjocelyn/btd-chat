import { User } from './user.model';

export class Chat {
  id: string;
  created: string; // first message timestamp
  updated: string; // last message timestamp
  users: string[]; // user ids
  messages: string[]; // message ids
  expand?: {
    users: User[];
    messages: Message[];
  };

  constructor(chat: Chat) {
    this.id = chat.id;
    this.created = chat.created;
    this.updated = chat.updated;
    this.users = chat.users;
    this.messages = chat.messages;
    this.expand = chat.expand;
  }

  toUser?(myUserId: string): User | undefined {
    return this.expand?.users.find((user) => user.id !== myUserId);
  }

  lastMessageSnippet?(): string {
    if (!this.expand?.messages?.length) {
      return '';
    }
    const lastMessage: Message = this.expand.messages[0];
    console.log('lastMessage', lastMessage);
    return lastMessage.content.slice(0, 40);
  }
}

export interface Message {
  id: string; // message id
  created: string; // message creation timestamp
  updated: string; // message update timestamp
  chatId: string; // chat id to which the message belongs
  content: string; // message text
  timestamp: number; // message timestamp
  sender: string; // message sender id
  receiver: string; // message receiver id
  file?: File; // message file
  isViewed: boolean; // message viewed status
  isDelivered: boolean; // message delivered status
  replyToMessageId?: string; // message id to which the message is a reply
  status: string; // message status
  expand?: {
    sender: User; // message sender
    receiver?: User; // message receiver
  };
  showTimestamp?: boolean; // show timestamp in message
  firstOfDate?: boolean; // show date separator before this message
}

export interface ChatMessage {
  id: string; // Unique ID of this message
  chatId: string; // ID of the chat this message belongs to
  sender: string; // ID of the user who sent this message
  content: string; // Content of this message
  created: string; // ISO 8601 date string of when this message was created
  updated: string; // ISO 8601 date string of when this message was last updated
}
