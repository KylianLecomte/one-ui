import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BaseInputFormControl } from '../base/base-input-form-control';
import { genericProvider } from '../base/generic-provider.provider';
import { NgClass } from '@angular/common';

type InputNumberType = number | null;

@Component({
  selector: 'one-input-number',
  imports: [NgClass],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  providers: [genericProvider(InputNumberComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent extends BaseInputFormControl<InputNumberType> {
  labelIsHidden = input<boolean>(false);
  min = input<number>(0);
  max = input<number>(99);
  step = input<number>(1);

  protected override handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue: InputNumberType = input.value ? Number(input.value) : null;
    this.updateValue(newValue);
  }
}
