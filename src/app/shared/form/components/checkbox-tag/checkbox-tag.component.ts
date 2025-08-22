import { Component, input } from '@angular/core';
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
  currentValue = input.required<string>();

  isChecked(): boolean {
    return Array.isArray(this.value) && this.value.includes(this.currentValue());
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let newValue = Array.isArray(this.value) ? [...this.value] : [];

    if (input.checked && !newValue.includes(this.currentValue())) {
      newValue.push(this.currentValue());
    } else {
      newValue = newValue.filter((d) => d !== this.currentValue());
    }

    this.updateValue(newValue);
  }
}
