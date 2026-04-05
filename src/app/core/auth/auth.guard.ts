import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);

  if (!auth.isAuthenticated()) {
    auth.login();
    return false;
  }

  return true;
};