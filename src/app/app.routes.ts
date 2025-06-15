import { Routes } from '@angular/router';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { authGuard } from './modules/auth/guards/auth/auth.guard';
import { APP_URL_CONF } from '../configuration/app-url.conf';
import { noAuthGuard } from './modules/auth/guards/no-auth/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: APP_URL_CONF.task.base, pathMatch: 'full' },
  {
    path: APP_URL_CONF.signUp,
    canActivate: [noAuthGuard],
    component: SignUpComponent,
  },
  {
    path: APP_URL_CONF.signIn,
    canActivate: [noAuthGuard],
    component: SignInComponent,
  },
  {
    path: APP_URL_CONF.task.base,
    canActivate: [authGuard],
    loadComponent: () => import('./modules/task/task.component').then((c) => c.TaskComponent),
  },
  {
    path: APP_URL_CONF.cook.base,
    canActivate: [authGuard],
    loadComponent: () => import('./modules/cook/cook.component').then((c) => c.CookComponent),
  },
  // TODO ajouter une page 404
];
