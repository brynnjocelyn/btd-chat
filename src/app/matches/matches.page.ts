import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderService } from '../components/header/header.service';
import { Router } from '@angular/router';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

interface Match {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

@Component({
  selector: 'btd-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButtons,
    IonButton,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
})
export class MatchesPage implements OnInit {
  matches: Match[] = [
    {
      id: '1',
      name: 'Jane Doe',
      bio: 'Loves hiking and photography.',
      avatar: 'assets/images/profile1.png',
    },
    {
      id: '2',
      name: 'John Smith',
      bio: 'Avid reader and coffee enthusiast.',
      avatar: 'assets/images/profile2.png',
    },
    // Add more sample matches...
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: Replace with API call to fetch matches
    console.log('Matches tab loaded.');
  }

  goToProfile(matchId: string) {
    // Navigate to the profile view of the selected match
    this.router.navigate(['/profile', matchId]);
  }

  startChat(matchId: string) {
    // Navigate to the chat room for the selected match
    this.router.navigate(['/tabs/chats/chat', matchId]);
  }
}
