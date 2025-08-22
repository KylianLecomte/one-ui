import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LabelPosition } from '../../../dtos/label-position.type';
import { BaseInputFormControl } from '../base/base-input-form-control';
import { genericProvider } from '../base/generic-provider.provider';

@Component({
  selector: 'one-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [genericProvider(CheckboxComponent)],
})
export class CheckboxComponent extends BaseInputFormControl<boolean> {
  labelPosition = input<LabelPosition>('left');
  asTag = input<boolean>(true);

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

  protected override handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateValue(input.checked);
  }
}
