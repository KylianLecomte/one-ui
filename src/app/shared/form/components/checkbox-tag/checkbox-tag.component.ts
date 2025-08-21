import { Component, computed, input } from '@angular/core';
import { LabelPosition } from '../../../dtos/label-position.type';

@Component({
  selector: 'one-checkbox-tag',
  imports: [],
  templateUrl: './checkbox-tag.component.html',
  styleUrl: './checkbox-tag.component.scss',
})
export class CheckboxTagComponent {
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
