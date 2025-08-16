import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LabelPosition } from '../../dtos/label-position.type';

@Component({
  selector: 'one-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  label = input.required<string>();
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
