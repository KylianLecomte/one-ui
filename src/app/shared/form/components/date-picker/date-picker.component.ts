import { ChangeDetectionStrategy, Component } from '@angular/core';
import { genericProvider } from '../base/generic-provider.provider';
import { BaseInputCvaWithLabel } from '../base/base-input-cva-with-label';
import { InputDateType } from '../base/base-input-form-control';
import { NgClass } from '@angular/common';
import { InputLabelComponent } from '../input-label/input-label.component';

@Component({
  selector: 'one-date-picker',
  imports: [NgClass, InputLabelComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [genericProvider(DatePickerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends BaseInputCvaWithLabel<InputDateType> {
  protected override extractValueFromEvent(event: Event): InputDateType {
    const input = event.target as HTMLInputElement;
    return input.value ? input.value : null;
  }
}
