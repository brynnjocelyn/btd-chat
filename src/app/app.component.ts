import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';

import { addIcons } from 'ionicons';
import { people, person, home, chatbubbles } from 'ionicons/icons';

import { HeaderService } from './components/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  routerEvents$: Observable<Event> =
    this.router.events.pipe(takeUntilDestroyed());
  constructor(
    private router: Router,
    private headerService: HeaderService,
  ) {
    /**
     * Any icons you want to use in the application
     * can be registered here and then
     * referenced by name anywhere in the application.
     */
    addIcons({
      people,
      person,
      home,
      chatbubbles,
    });
  }

  ngOnInit() {
    this.routerEvents$.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        switch (url) {
          case '/tabs/matches':
            this.headerService.setHeaderTitle('Matches');
            break;
          case '/tabs/chat':
            this.headerService.setHeaderTitle('Chats');
            break;
          case '/tabs/profile':
            this.headerService.setHeaderTitle('Profile');
            break;
          case '/tabs/home':
            this.headerService.setHeaderTitle('Discover People');
            break;
          default:
            this.headerService.setHeaderTitle('Unknown');
            break;
        }
      }
    });
  }
}
