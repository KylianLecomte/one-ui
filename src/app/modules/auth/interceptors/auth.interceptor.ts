import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { TypeToken, UserStorageUtils } from '../../../shared/storage/UserStorage.utils';
import { JwtTokens } from '../domain/dtos/auth-token.dto';
import { RouterService } from '../../../shared/routing/route.service';
import { API_URI_CONF } from '../../../../configuration/api-uri.conf';
import { HttpHeadersUtils } from '../../../shared/utils/http-headers.utils';
import { AuthUser } from '../domain/dtos/auth.dto';
import { AuthUtils } from '../utils/auth.utils';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);
  const routerService: RouterService = inject(RouterService);

  const isPublic: boolean =
    req.url.includes(API_URI_CONF.auth.signIn()) || req.url.includes(API_URI_CONF.auth.signUp());

  if (isPublic) {
    return next(req);
  }

  const accessToken: string | undefined = UserStorageUtils.getToken(TypeToken.ACCESS_TOKEN);

  if (accessToken) {
    req = getRequestWithBearerToken(req, accessToken);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
      if (!req.url.includes(API_URI_CONF.auth.base) && error.status === 401) {
        return handle401Error(req, next, authService, routerService);
      }

      return throwError((): HttpErrorResponse => {
        console.error(error);
        AuthUtils.resetAuth(routerService);
        return error;
      });
    }),
  );
};

const getRequestWithBearerToken = <T>(req: HttpRequest<T>, accessToken: string) => {
  return req.clone({
    setHeaders: HttpHeadersUtils.getBearerHeader(accessToken),
  });
};

const handle401Error: <T>(
  req: HttpRequest<T>,
  next: HttpHandlerFn,
  authService: AuthService,
  routerService: RouterService,
) => Observable<HttpEvent<unknown>> = <T>(
  req: HttpRequest<T>,
  next: HttpHandlerFn,
  authService: AuthService,
  routerService: RouterService,
): Observable<HttpEvent<unknown>> => {
  console.log('401 error');

  const refreshToken: string | undefined = UserStorageUtils.getToken(TypeToken.REFRESH_TOKEN);

  if (!refreshToken) {
    routerService.toSignInPage();
    return throwError(
      (): HttpErrorResponse =>
        new HttpErrorResponse({
          status: 401,
          error: { message: 'Refresh token is undefined' },
        }),
    );
  }

  return authService.refreshAccessToken(refreshToken).pipe(
    switchMap((response: JwtTokens): Observable<HttpEvent<unknown>> => {
      const currentAuthUser: AuthUser | undefined = UserStorageUtils.get();

      if (!currentAuthUser) {
        return throwError(
          (): HttpErrorResponse =>
            new HttpErrorResponse({
              status: 401,
              error: { message: 'Fail to get user from localStorage' },
            }),
        );
      }

      UserStorageUtils.updateTokens(response);

      return next(getRequestWithBearerToken(req, response.accessToken));
    }),
  );
};
