import { IconDefinition } from '@fortawesome/angular-fontawesome';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastIcon = 'check' | 'times-circle' | 'info-circle' | 'warning';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: ToastType;
  icon: IconDefinition;
}
