import { CanActivateFn, Router } from '@angular/router';
import PocketBase from 'pocketbase';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const pb = new PocketBase(environment.pbBaseUrl); // Replace with your Pocketbase URL

  if (pb.authStore.isValid) {
    return true; // Allow navigation
  } else {
    router.navigate(['/login']); // Redirect to login
    return false;
  }
};
