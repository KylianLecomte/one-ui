import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_URL_CONF } from '../../../../configuration/app-url.conf';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private readonly router: Router = inject(Router);

  toSignInPage(): void {
    this.router.navigate([`${APP_URL_CONF.signIn}`]).then();
  }

  toHomePage(): void {
    this.router.navigate([`${APP_URL_CONF.task.base}`]).then();
  }
}
