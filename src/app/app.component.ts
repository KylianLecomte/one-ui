import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './shared/toast/toaster.component';
import { MainMenuComponent } from './modules/menu/components/main-menu/main-menu.component';
import { AuthService } from './modules/auth/services/auth.service';
import { ContextMenuComponent } from './shared/menu/context-menu/context-menu.component';

@Component({
  selector: 'one-root',
  imports: [CommonModule, RouterOutlet, ToasterComponent, MainMenuComponent, ContextMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'one-ui';

  authService: AuthService = inject(AuthService);

  get isAuthentificated(): boolean {
    return this.authService.isAuthenticated;
  }
}
