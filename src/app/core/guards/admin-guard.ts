import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (localStorage.getItem('userToken')?.includes('admin') !== false) {
    return true;
  } else {
    _Router.navigate(['/home']);
    return false;
  }
};
