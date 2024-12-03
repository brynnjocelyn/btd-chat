import { Component, OnInit } from '@angular/core';
import {
  IonFooter,
  IonIcon,
  IonRouterLink,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'btd-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonTitle,
    IonToolbar,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    RouterModule,
    IonRouterLink,
    CommonModule,
  ],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
