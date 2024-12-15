import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonAvatar,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonTitle,
  ],
})
export class ProfileViewPage implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId') || '';
    this.loadUserProfile(userId);
  }

  loadUserProfile(userId: string) {
    // TODO: Replace with an API call to fetch the user's profile
    this.user = {
      id: userId,
      name: 'John Doe',
      avatar: 'assets/images/avatar.jpg',
      bio: 'Photographer, Traveler, and Coffee Lover.',
      description: 'Loves exploring new places and sharing experiences.',
    };
  }

  startChat(userId: string) {
    console.log(`Starting chat with user ID: ${userId}`);
    // TODO: Navigate to the chat room or start a new chat
  }
}
