import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BaseInputFormControl, InputNumberType } from '../base/base-input-form-control';
import { genericProvider } from '../base/generic-provider.provider';
import { NgClass } from '@angular/common';
import { InputLabelComponent } from '../input-label/input-label.component';

@Component({
  selector: 'one-input-number',
  imports: [NgClass, InputLabelComponent],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  providers: [genericProvider(InputNumberComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent extends BaseInputFormControl<InputNumberType> {
  min = input<number>(0);
  max = input<number>(99);
  step = input<number>(1);

  protected override extractValueFromEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    const numberValue = Number(input.value);
    return isNaN(numberValue) ? null : numberValue;
  }
}
