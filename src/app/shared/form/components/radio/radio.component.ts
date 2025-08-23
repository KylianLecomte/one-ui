import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LabelPosition } from '../../../dtos/label-position.type';
import { RadioControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { genericProvider } from '../base/generic-provider.provider';

@Component({
  selector: 'one-radio',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [genericProvider(RadioComponent)],
})
export class RadioComponent extends RadioControlValueAccessor {
  disabled: boolean = false;

  id = input.required<string>();
  label = input<string>();
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

  override setDisabledState(isDisabled: boolean) {
    super.setDisabledState(isDisabled);
    this.disabled = isDisabled;
  }

  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateValue(input.value);
  }

  protected updateValue(value: string): void {
    this.value = value;
    this.onChange();
    this.onTouched();
  }
}
