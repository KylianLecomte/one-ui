import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'one-input-number',
  imports: [NgClass],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  id = input.required<string>();
  label = input.required<string>();
  labelIsHidden = input<boolean>(false);
  min = input<number>(0);
  max = input<number>(99);
}
