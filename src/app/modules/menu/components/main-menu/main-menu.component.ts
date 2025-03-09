import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  FaIconComponent,
  FaStackItemSizeDirective,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'one-main-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FaIconComponent,
    FaStackItemSizeDirective,
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  authService: AuthService = inject(AuthService);

  faCircleCheck: IconDefinition = faCircleCheck;
  faUtensils: IconDefinition = faUtensils;
  faArrowRightFromBracket: IconDefinition = faArrowRightFromBracket;
  faUser: IconDefinition = faUser;

  onClickLogout(): void {
    this.authService.logout();
  }
}
