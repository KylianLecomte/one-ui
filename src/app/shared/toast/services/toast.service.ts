import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastType } from '../domain/dtos/toast.dto';
import { faCheck, faInfoCircle, faTimesCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private readonly toastSubject: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  toasts$: Observable<Toast[]> = this.toastSubject.asObservable();

  remove(id: number): void {
    this.toasts = this.toasts.filter((toast: Toast): boolean => toast.id !== id);
    this.toastSubject.next(this.toasts);
  }

  success(title: string, message: string): number {
    return this.show(title, message, 'success', faCheck);
  }

  error(title: string, message: string): number {
    return this.show(title, message, 'error', faTimesCircle);
  }

  info(title: string, message: string): number {
    return this.show(title, message, 'info', faInfoCircle);
  }

  warning(title: string, message: string): number {
    return this.show(title, message, 'warning', faWarning);
  }

  private show(title: string, message: string, type: ToastType, icon: IconDefinition): number {
    const id: number = Date.now();
    this.toasts.push({ id, title, message, type, icon });
    this.toastSubject.next(this.toasts);
    setTimeout((): void => this.remove(id), 3000);
    return id;
  }
}


