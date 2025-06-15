import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { MousePosition } from '../models/mouse-position.model';
import { ContextMenuData, ContextMenuItem } from '../models/context-menu-data.model';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  private readonly _mousePosition: WritableSignal<MousePosition | undefined> = signal(undefined);
  private readonly _opened: WritableSignal<boolean> = signal(false);

  private data: ContextMenuData | undefined = undefined;

  constructor() {}

  get mousePosition(): Signal<MousePosition | undefined> {
    return this._mousePosition.asReadonly();
  }

  get opened(): Signal<boolean> {
    return this._opened.asReadonly();
  }

  get items(): ContextMenuItem[] {
    return this.data?.items ?? [];
  }

  onOpen(cmData: ContextMenuData): void {
    this.data = cmData;
    this._mousePosition.set(cmData.mousePosition);
    this._opened.set(true);
  }

  onClose(): void {
    this._mousePosition.set(undefined);
    this._opened.set(false);
  }
}
