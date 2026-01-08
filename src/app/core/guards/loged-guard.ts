import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('userToken') !== null) {
    _Router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
