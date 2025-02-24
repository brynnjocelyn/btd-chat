import { Component, DestroyRef, Input, OnInit } from '@angular/core';
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
import { AuthService } from 'src/app/services/auth.service';

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
  isAuthenticated: boolean = false;

  getHeaderTitle$ = this.headerService
    .getHeaderTitle()
    .pipe(takeUntilDestroyed());

  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    console.log('HeaderComponent initialized', this.title);

    // Store listeners
    this.headerTitleListener();
    this.authenticatedListener();
  }

  headerTitleListener(): void {
    this.headerService
      .getHeaderTitle()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((title) => {
        console.log('HeaderComponent title changed', title);
        this.title = title;
      });
  }

  authenticatedListener(): void {
    this.authService
      .getAuthStatus()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isAuthenticated) => {
        console.log('HeaderComponent isAuthenticated changed', isAuthenticated);
        this.isAuthenticated = isAuthenticated;
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
