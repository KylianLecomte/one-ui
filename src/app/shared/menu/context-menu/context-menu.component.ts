import { Component, effect, HostBinding, inject } from '@angular/core';
import { ContextMenuService } from './services/context-menu.service';
import { ContextMenuItem } from './models/context-menu-data.model';

@Component({
  selector: 'one-context-menu',
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent {
  contextMenuService: ContextMenuService = inject(ContextMenuService);

  @HostBinding('class') hostClass: string = '';

  constructor() {
    effect((): void => {
      this.hostClass = this.contextMenuService.opened() ? 'opened' : '';
    });
  }

  @HostBinding('style.left')
  get posX(): string {
    return `${this.contextMenuService.mousePosition()?.x ?? 0}px`;
  }

  @HostBinding('style.top')
  get posY(): string {
    return `${this.contextMenuService.mousePosition()?.y ?? 0}px`;
  }

  get items(): ContextMenuItem[] {
    return this.contextMenuService.data()?.items ?? [];
  }
}
