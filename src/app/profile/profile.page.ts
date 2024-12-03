import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'btd-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
})
export class ProfilePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
