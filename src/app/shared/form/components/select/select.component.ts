import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseInputFormControl } from '../base/base-input-form-control';

@Component({
  selector: 'one-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent extends BaseInputFormControl {
  options = input<string[]>();

  handleChange(event: Event): void {
    const input = event.target as HTMLSelectElement;
    this.updateValue(input.value);
  }
}
