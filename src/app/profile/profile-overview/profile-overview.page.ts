import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonItem,
  IonList,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.page.html',
  styleUrls: ['./profile-overview.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonItem,
    IonList,
    CommonModule,
    FormsModule,
  ],
})
export class ProfileOverviewPage implements OnInit {
  user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'Full-stack developer and tech enthusiast.',
    avatar: 'assets/images/avatar.jpg',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  goToEditProfile() {
    this.router.navigate(['/tabs/profile/edit']);
  }

  goToSettings() {
    this.router.navigate(['/tabs/profile/settings']);
  }
}
