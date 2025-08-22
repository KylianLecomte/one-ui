import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaseInputFormControl } from '../base/base-input-form-control';
import { ReactiveFormsModule } from '@angular/forms';
import { genericProvider } from '../base/generic-provider.provider';

type InputNumberType = number | null;

@Component({
  selector: 'one-input-number',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  providers: [genericProvider(InputNumberComponent)],
})
export class InputNumberComponent extends BaseInputFormControl<InputNumberType> {
  labelIsHidden = input<boolean>(false);
  min = input<number>(0);
  max = input<number>(99);

  protected override handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue: InputNumberType = input.value ? Number(input.value) : null;
    this.updateValue(newValue);
  }
}
