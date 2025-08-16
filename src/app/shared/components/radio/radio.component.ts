import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LabelPosition } from '../../dtos/label-position.type';

@Component({
  selector: 'one-radio',
  imports: [NgClass],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  label = input.required<string>();
  group = input.required<string>();
  id = input.required<string>();
  labelPosition = input<LabelPosition>('left');

  cssLabelPosition = computed(() => {
    switch (this.labelPosition()) {
      case 'top':
        return 'flex-col';
      case 'bottom':
        return 'flex-col-reverse';
      case 'left':
        return 'flex-row';
      case 'right':
        return 'flex-row-reverse';
    }
  });
}
