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
import { TypeToken, UserStorageUtils } from '../../storage/UserStorage.utils';
import { JwtTokens } from '../domain/dtos/auth-token.dto';
import { AuthUser } from '../domain/dtos/auth.dto';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);

  return next(setBearToken(request)).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
      if (!request.url.includes('auth') && error.status === 401) {
        return handle401Error(request, next, authService);
      }

      return throwError((): HttpErrorResponse => error);
    }),
  );
};

const setBearToken: <T>(request: HttpRequest<T>) => HttpRequest<T> = <T>(
  request: HttpRequest<T>,
): HttpRequest<T> => {
  let token: string | undefined = UserStorageUtils.getToken(
    TypeToken.ACCESS_TOKEN,
  );

  if (request.url.includes('auth/refresh-tokens')) {
    token = UserStorageUtils.getToken(TypeToken.REFRESH_TOKEN);
  }

  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`),
  });
};

const handle401Error: <T>(
  request: HttpRequest<T>,
  next: HttpHandlerFn,
  authService: AuthService,
) => Observable<HttpEvent<unknown>> = <T>(
  request: HttpRequest<T>,
  next: HttpHandlerFn,
  authService: AuthService,
): Observable<HttpEvent<unknown>> => {
  console.log('401 error');

  return authService.refreshTokens().pipe(
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

      currentAuthUser.accessToken = response.accessToken;
      currentAuthUser.user.refreshToken = response.refreshToken;

      UserStorageUtils.set(currentAuthUser);
      return next(setBearToken(request));
    }),
  );
};
