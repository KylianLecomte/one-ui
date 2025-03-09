import { inject, Injectable } from '@angular/core';
import { AuthUser, SignIn, SignUp } from '../domain/dtos/auth.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserStorageUtils } from '../../storage/UserStorage.utils';
import { Router } from '@angular/router';
import { JwtTokens } from '../domain/dtos/auth-token.dto';
import {
  API_URI_CONF,
  LOCAL_API_PATH,
} from '../../../../configuration/api-uri.conf';
import { AppUrlConf } from '../../../../configuration/app-url.conf';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);

  get jwtUser(): AuthUser | undefined {
    return UserStorageUtils.get() ?? undefined;
  }

  get isAuthenticated(): boolean {
    return !!this.jwtUser;
  }

  signUp(signUpDto: SignUp): void {
    this.httpClient
      .post<void>(`${LOCAL_API_PATH}${API_URI_CONF.auth.signUp()}`, signUpDto)
      .subscribe({
        next: (): void => {
          this.router.navigate([`/${AppUrlConf.signIn}`]); // à faire automatiquement
        },
        error: (error): void => {
          console.log(error);
        },
      });
  }

  signIn(signInDto: SignIn): void {
    this.httpClient
      .post<AuthUser>(
        `${LOCAL_API_PATH}${API_URI_CONF.auth.signIn()}`,
        signInDto,
      )
      .subscribe({
        next: (jwtUser: AuthUser): void => {
          if (jwtUser) {
            UserStorageUtils.set(jwtUser);
            this.router.navigate([`/${AppUrlConf.task.base}`]);
          }
        },
        error: (error): void => {
          console.log(error);
        },
      });
  }

  refreshTokens(): Observable<JwtTokens> {
    return this.httpClient.post<JwtTokens>(
      `${LOCAL_API_PATH}${API_URI_CONF.auth.refreshToken()}`,
      {},
    );
  }

  logout(): void {
    this.httpClient
      .get<boolean>(`${LOCAL_API_PATH}${API_URI_CONF.auth.logout()}`)
      .subscribe({
        next: (): void => {
          UserStorageUtils.removeCurrentUser();
          this.router.navigate([`/${AppUrlConf.signIn}`]); // À faire automatiquement quand 401 sans refresh token
        },
        error: (error): void => {
          console.log(error);
        },
      });
  }
}
