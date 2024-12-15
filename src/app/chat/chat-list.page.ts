import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonNote,
  IonToolbar,
  IonAvatar,
  IonLabel,
  IonTitle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'btd-chat',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonToolbar,
    IonList,
    IonItem,
    IonContent,
    IonNote,
    IonAvatar,
    IonLabel,
    IonTitle,
    CommonModule,
  ],
})
export class ChatListPage {
  chats = [
    {
      id: '1',
      name: 'Jane Doe',
      avatar: 'assets/images/profile2.png',
      lastMessage: 'Hi there!',
      lastActivity: new Date(),
    },
    {
      id: '2',
      name: 'John Smith',
      avatar: 'assets/images/profile1.png',
      lastMessage: 'See you soon.',
      lastActivity: new Date(),
    },
    // Add more sample chats...
  ];

  constructor(
    private router: Router,
    private chatService: ChatService,
  ) {}

  goToChat(chatId: string, userProfileImage: string, userName: string) {
    this.chatService.setSelectedChat({
      id: chatId,
      userProfileImage,
      userName,
    });
    this.router.navigate(['/tabs/chat', chatId]);
  }
}
