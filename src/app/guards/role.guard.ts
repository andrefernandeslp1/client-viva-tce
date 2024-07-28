import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JWTTokenService } from '../service/jwttoken.service';
import { AppService } from '../service/app.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const appService = inject(AppService);
  const router  = inject(Router);

  const role = appService.userLogged().role;
  const expectedRoles = route.data['expectedRoles'];

  if (!role || !expectedRoles.includes(role)) {
    return router.createUrlTree(['unauthorized']);
  }
  else {
    return true;
  }
};
