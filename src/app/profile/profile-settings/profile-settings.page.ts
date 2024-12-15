import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
  standalone: true,
  imports: [
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
    CommonModule,
    FormsModule,
  ],
})
export class ProfileSettingsPage implements OnInit {
  settings = {
    notifications: true,
    privacy: false,
  };

  constructor() {}

  ngOnInit() {}

  logout() {
    console.log('User logged out');
    // TODO: Implement logout logic
  }
}
