import { Component, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { HeaderService } from './header.service';

@Component({
  selector: 'btd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonAvatar,
    IonGrid,
    IonCol,
    IonRow,
    IonButtons,
    IonButton,
    IonIcon,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() showButton: boolean = false;
  title: string = '';

  getHeaderTitle$ = this.headerService
    .getHeaderTitle()
    .pipe(takeUntilDestroyed());

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    console.log('HeaderComponent initialized', this.title);

    // Store listeners
    this.getHeaderTitle$.subscribe((title) => {
      console.log('HeaderComponent title changed', title);
      this.title = title;
    });
  }
}
