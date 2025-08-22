import { Component, input } from '@angular/core';
import { LabelPosition } from '../../../dtos/label-position.type';
import { BaseInputFormControl } from '../base/base-input-form-control';
import { genericProvider } from '../base/generic-provider.provider';

@Component({
  selector: 'one-checkbox-tag',
  imports: [],
  templateUrl: './checkbox-tag.component.html',
  styleUrl: './checkbox-tag.component.scss',
  providers: [genericProvider(CheckboxTagComponent)],
})
export class CheckboxTagComponent extends BaseInputFormControl<string[]> {
  labelPosition = input<LabelPosition>('left');
  currentValue = input.required<string>();

  isChecked(): boolean {
    return Array.isArray(this.currentValue) && this.currentValue.includes(this.currentValue());
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let newValue = Array.isArray(this.currentValue) ? [...this.currentValue] : [];

    if (input.checked && !newValue.includes(this.currentValue())) {
      newValue.push(this.currentValue());
    } else {
      newValue = newValue.filter((d) => d !== this.currentValue());
    }

    this.updateValue(newValue);
  }
}
