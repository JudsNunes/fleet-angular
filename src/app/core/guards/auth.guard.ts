import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // TODO: implement real auth check with JWT
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return router.createUrlTree(['/login']);
  }
  return true;
};
