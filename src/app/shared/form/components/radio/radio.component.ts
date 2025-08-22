import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LabelPosition } from '../../../dtos/label-position.type';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseInputFormControl } from '../base/base-input-form-control';
import { genericProvider } from '../base/generic-provider.provider';

@Component({
  selector: 'one-radio',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [genericProvider(RadioComponent)],
})
export class RadioComponent extends BaseInputFormControl<string> {
  group = input.required<string>();
  labelPosition = input<LabelPosition>('left');

  formValue = input.required<string>();

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

  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateValue(input.value);
  }
}
