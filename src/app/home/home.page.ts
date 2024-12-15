import { Component } from '@angular/core';
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonSearchbar,
  IonCardHeader,
  IonButton,
  IonCardTitle,
  IonCardContent,
  ModalController,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { ChatRoomComponent } from '../components/chat-room/chat-room.component';

interface UserProfile {
  id: string;
  name: string;
  imageUrl: string;
  shortBio: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    ChatRoomComponent,
    HeaderComponent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonGrid,
    IonRow,
    IonSearchbar,
    IonCol,
    CommonModule,
  ],
  providers: [ModalController],
})
export class HomePage {
  profiles: UserProfile[] = [
    {
      id: '1',
      name: 'Jane Doe',
      // imageUrl: 'assets/images/jane.jpg',
      imageUrl: 'assets/images/profile2.png',
      shortBio: 'Love coding and exploring!',
    },
    {
      id: '2',
      name: 'John Smith',
      imageUrl: 'assets/images/profile1.png',
      shortBio: 'Tech enthusiast, always learning.',
    },
    // More sample data...
  ];
  filteredProfiles: UserProfile[] = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log('HomePage initialized');
    this.filteredProfiles = this.profiles;
  }

  filterProfiles(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredProfiles = this.profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm),
      );
    } else {
      this.filteredProfiles = this.profiles;
    }
  }

  viewProfile(profileId: string) {
    // Route to Profile view page
    console.log(`View profile with ID: ${profileId}`);
  }

  async openChat(userId: string, userName: string, userProfileImage: string) {
    const modal = await this.modalCtrl.create({
      component: ChatRoomComponent,
      componentProps: { userId, userName, userProfileImage },
    });
    return await modal.present();
  }
}
