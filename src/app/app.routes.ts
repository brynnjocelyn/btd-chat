import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((c) => c.ProfilePage),
      },
      {
        path: 'chat',
        loadComponent: () => import('./chat/chat.page').then((c) => c.ChatPage),
      },
      {
        path: 'matches',
        loadComponent: () =>
          import('./matches/matches.page').then((c) => c.MatchesPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'profile/:userId',
    loadComponent: () =>
      import('./profile-view/profile-view.page').then((c) => c.ProfileViewPage),
  },
  {
    path: 'chat/:chatId',
    loadComponent: () => import('./chat/chat.page').then((c) => c.ChatPage),
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
