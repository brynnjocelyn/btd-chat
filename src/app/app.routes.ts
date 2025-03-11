import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard], // Protect tabs with AuthGuard
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((c) => c.ProfilePage),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./profile/profile-overview/profile-overview.page').then(
                (c) => c.ProfileOverviewPage,
              ),
          },
          {
            path: 'edit',
            loadComponent: () =>
              import('./profile/profile-edit/profile-edit.page').then(
                (c) => c.ProfileEditPage,
              ),
          },
          {
            path: 'settings',
            loadComponent: () =>
              import('./profile/profile-settings/profile-settings.page').then(
                (c) => c.ProfileSettingsPage,
              ),
          },
        ],
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./chat/chat-list.page').then((c) => c.ChatListPage),
          },
          {
            path: ':chatId',
            loadComponent: () =>
              import('./components/chat-room/chat-room.component').then(
                (c) => c.ChatRoomComponent,
              ),
          },
        ],
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
      {
        path: '**',
        redirectTo: '/not-found',
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
    loadComponent: () =>
      import('./components/chat-room/chat-room.component').then(
        (c) => c.ChatRoomComponent,
      ),
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'profile-overview',
    loadComponent: () =>
      import('./profile/profile-overview/profile-overview.page').then(
        (m) => m.ProfileOverviewPage,
      ),
  },
  {
    path: 'profile-edit',
    loadComponent: () =>
      import('./profile/profile-edit/profile-edit.page').then(
        (m) => m.ProfileEditPage,
      ),
  },
  {
    path: 'profile-settings',
    loadComponent: () =>
      import('./profile/profile-settings/profile-settings.page').then(
        (m) => m.ProfileSettingsPage,
      ),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage,
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
  {
    path: 'auth/reset-password-request-sent',
    loadComponent: () =>
      import(
        './reset-password-request-sent/reset-password-request-sent.page'
      ).then((m) => m.ResetPasswordRequestSentPage),
  },
  {
    path: 'auth/confirm-password-reset/:token',
    loadComponent: () =>
      import('./confirm-password-reset/confirm-password-reset.page').then(
        (m) => m.ConfirmPasswordResetPage,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
