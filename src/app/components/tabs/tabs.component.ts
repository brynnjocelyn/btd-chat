import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonRouterLink,
} from '@ionic/angular/standalone';

@Component({
  selector: 'btd-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    RouterModule,
    IonRouterLink,
    CommonModule,
  ],
})
export class TabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onTabsChanged(event: any) {
    console.log('Tabs changed', event);
  }
}
