import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { APP_URL_CONF } from '../../../../../configuration/app-url.conf';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isAuthenticated) {
    router.navigateByUrl(APP_URL_CONF.signIn).then();
    console.error('ta pas le droit');
    return false;
  } else {
    console.log('ta le droit');
  }

  return true;
};
