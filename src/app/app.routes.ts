import { Routes } from '@angular/router';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { AppUrlConf } from '../configuration/app-url.conf';

export const routes: Routes = [
  { path: '', redirectTo: AppUrlConf.task.base, pathMatch: 'full' },
  {
    path: AppUrlConf.signUp,
    component: SignUpComponent,
  },
  {
    path: AppUrlConf.signIn,
    component: SignInComponent,
  },
  {
    path: AppUrlConf.task.base,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/task/components/task-home/task-home.component').then(
        (c) => c.TaskHomeComponent,
      ),
  },
  {
    path: AppUrlConf.cook.base,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/cook/components/cook-home/cook-home.component').then(
        (c) => c.CookHomeComponent,
      ),
  },
];
