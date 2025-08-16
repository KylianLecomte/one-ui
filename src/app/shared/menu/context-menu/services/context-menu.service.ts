import { Injectable, signal, WritableSignal } from '@angular/core';
import { MousePosition } from '../models/mouse-position.model';
import { ContextMenuData } from '../models/context-menu-data.model';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  readonly mousePosition: WritableSignal<MousePosition | undefined> = signal(undefined);
  readonly opened: WritableSignal<boolean> = signal(false);
  readonly data: WritableSignal<ContextMenuData | undefined> = signal(undefined);

  onOpen(cmData: ContextMenuData): void {
    this.data.set(cmData);
    this.mousePosition.set(cmData.mousePosition);
    this.opened.set(true);
  }

  onClose(): void {
    this.mousePosition.set(undefined);
    this.opened.set(false);
  }
}
