import { MousePosition } from './mouse-position.model';

export interface ContextMenuItem {
  libelle: string;
  icon?: string;
  action: (event: any) => void;
}

export interface ContextMenuData {
  items: ContextMenuItem[];
  mousePosition: MousePosition;
}
