import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

interface Chat {
  id: string;
  messages: { text: string; senderId: string; timestamp: string }[];
  userProfileImage?: string;
  userName?: string;
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonTitle,
    IonButton,
    IonContent,
    IonItem,
    IonList,
    IonFooter,
    IonTextarea,
    IonLabel,
    FormsModule,
    CommonModule,
  ],
  providers: [ModalController],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() userId!: string;
  @Input() chatId!: string; // Input for modal usage
  @Input() userName!: string;
  @Input() userProfileImage?: string;

  chat!: Partial<Chat>;
  newMessage = '';

  unsubscribe$ = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private chatService: ChatService,
  ) {}

  // Fetch chat data based on userId
  ngOnInit() {
    // Determine if the component is being used in modal or route context
    const routeChatId = this.route.snapshot.paramMap.get('chatId');

    if (routeChatId) {
      this.chatId = routeChatId;
      this.loadChatById(this.chatId);
    } else if (this.userId) {
      this.initiateChatWithUser(this.userId);
    } else {
      console.error(
        'ChatRoomComponent requires either chatId or userId to function properly.',
      );
    }

    // Subscribe to chat updates
    this.chatService
      .getSelectedChat()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((chat) => {
        if (chat?.id === this.chat.id) {
          this.chat = chat as Chat;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadChatById(chatId: string) {
    // TODO: Replace with API call to fetch chat data by chatId
    console.log(`Loading existing chat with chatId: ${chatId}`);
    this.chat = {
      id: chatId,
      messages: [
        { text: 'Hi!', senderId: 'me', timestamp: new Date().toISOString() },
        {
          text: 'How are you?',
          senderId: 'Jane',
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  initiateChatWithUser(userId: string) {
    // TODO: Replace with API call to fetch or create a new chat for the given userId
    console.log(`Initiating chat with userId: ${userId}`);

    // Mock API response
    const chatExists = false; // Replace with real lookup for existing chat
    if (chatExists) {
      this.chatId = 'existing-chat-id'; // Replace with actual existing chatId
      this.loadChatById(this.chatId);
    } else {
      // Simulate creating a new chat
      this.chatId = 'new-chat-id'; // Replace with actual chatId from API
      this.chat = {
        id: this.chatId,
        messages: [],
        userProfileImage: this.userProfileImage,
      };
      console.log(`Created new chat with chatId: ${this.chatId}`);
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chat.messages?.push({
        text: this.newMessage,
        senderId: 'me', // Replace with actual sender ID
        timestamp: new Date().toISOString(),
      });
      this.newMessage = '';
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
