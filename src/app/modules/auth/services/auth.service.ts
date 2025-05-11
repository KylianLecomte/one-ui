import { inject, Injectable } from '@angular/core';
import { AuthUser, SignIn, SignUp } from '../domain/dtos/auth.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserStorageUtils } from '../../storage/UserStorage.utils';
import { Router } from '@angular/router';
import { JwtTokens } from '../domain/dtos/auth-token.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { RouterService } from '../../../shared/api/routing/route.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly routerService: RouterService = inject(RouterService);
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
          this.routerService.toSignInPage();
        },
        error: (error): void => {
          console.error(error);
        },
      });
  }

  signIn(signInDto: SignIn): void {
    this.httpClient
      .post<AuthUser>(`${LOCAL_API_PATH}${API_URI_CONF.auth.signIn()}`, signInDto)
      .subscribe({
        next: (jwtUser: AuthUser): void => {
          if (jwtUser) {
            UserStorageUtils.set(jwtUser);
            this.routerService.toHomePage();
          }
        },
        error: (error): void => {
          console.error(error);
        },
      });
  }

  refreshAccessToken(refreshToken: string): Observable<JwtTokens> {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.httpClient.post<JwtTokens>(`${LOCAL_API_PATH}${API_URI_CONF.auth.token()}`, body, {
      headers,
    });
  }

  logout(): void {
    this.httpClient.get<boolean>(`${LOCAL_API_PATH}${API_URI_CONF.auth.logout()}`).subscribe({
      next: (): void => {
        UserStorageUtils.removeCurrentUser();
        this.routerService.toSignInPage();
      },
      error: (error): void => {
        // TODO gestion de deux erreurs différentes
        console.error(error);
      },
    });
  }
}
