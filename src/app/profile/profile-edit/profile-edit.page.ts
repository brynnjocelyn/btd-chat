import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonLabel,
  IonInput,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonBackButton,
  ],
})
export class ProfileEditPage implements OnInit {
  user = {
    name: 'Jane Doe',
    bio: 'Full-stack developer and tech enthusiast.',
    avatar: 'assets/images/avatar.jpg',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // TODO: Handle file upload logic
      console.log('Avatar file selected:', file);
    }
  }

  saveProfile() {
    // TODO: Save updated profile details
    console.log('Profile saved:', this.user);
    this.router.navigate(['/tabs/profile']);
  }
}
