import { catchError, switchMap, throwError } from 'rxjs';
import { TypeToken, UserStorageUtils } from '../../../shared/storage/UserStorage.utils';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../../../shared/routing/route.service';
import { ToastService } from '../../../shared/toast/services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const routerService = inject(RouterService);
  const toastService = inject(ToastService);

  let isRefreshing = false;

  const isTokenEndpoint = req.url.includes('/auth/token');

  // Ne jamais ajouter de token ni refresh sur /auth/token
  if (isTokenEndpoint) {
    return next(req);
  }

  const accessToken = UserStorageUtils.getToken(TypeToken.ACCESS_TOKEN);

  // Ajouter le token seulement si ce n’est pas /auth/token
  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const refreshToken = UserStorageUtils.getToken(TypeToken.REFRESH_TOKEN);

      console.log(error);
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        if (!refreshToken) {
          return forceLogout(routerService, toastService);
        }

        return authService.refreshAccessToken(refreshToken).pipe(
          switchMap((tokens) => {
            isRefreshing = false;

            UserStorageUtils.updateAccessToken(tokens);

            const retryReq = authReq.clone({
              setHeaders: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });

            return next(retryReq);
          }),
          catchError(() => {
            isRefreshing = false;
            return forceLogout(routerService, toastService);
          })
        );
      }

      if ([401, 403, 500].includes(error.status)) {
        return forceLogout(routerService, toastService);
      }

      return throwError(() => error);
    })
  );
};

function forceLogout(routerService: RouterService, toastService: ToastService) {
  UserStorageUtils.removeCurrentUser();
  routerService.toSignInPage();
  toastService.error('Déconnexion', 'Session expirée');
  return throwError(() => new Error('Session expired'));
}
