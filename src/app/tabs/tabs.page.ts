import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, CommonModule, HeaderComponent, FooterComponent],
})
export class TabsPage implements OnInit {
  title = 'Tabs3';
  constructor() {}

  ngOnInit() {}
}
