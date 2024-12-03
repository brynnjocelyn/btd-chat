import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'btd-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
})
export class ChatPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
