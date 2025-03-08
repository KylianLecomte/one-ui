import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../domain/dtos/toast.dto';

@Component({
  selector: 'one-toaster',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('300ms ease-out', style({transform: 'translateY(0%)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)', opacity: 0}))
      ]),
    ]),
  ]
})
export class ToasterComponent implements OnInit, OnDestroy {


  toasts: Toast[] = [];
  private readonly toastService: ToastService = inject(ToastService);
  private subscription: Subscription | undefined;

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => this.toasts = toasts);
  }

  removeToast(id: number): void {
    this.toastService.remove(id);
  }
}
