import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { APP_URL_CONF } from '../../../../../configuration/app-url.conf';

export const noAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated) {
    router.navigateByUrl(APP_URL_CONF.task.base);
    console.error('déjà connecté');
    return false;
  } else {
    console.log('Tu dois te connecter');
  }

  return true;
};
