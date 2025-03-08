import { Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'one-layout',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  openedRightSide: InputSignal<boolean> = input(false);
}
