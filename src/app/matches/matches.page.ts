import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'btd-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
})
export class MatchesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
