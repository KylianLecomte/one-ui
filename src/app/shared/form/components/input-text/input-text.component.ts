import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputFormControl, InputStringType } from '../base/base-input-form-control';
import { NgClass } from '@angular/common';
import { genericProvider } from '../base/generic-provider.provider';
import { InputLabelComponent } from '../input-label/input-label.component';

@Component({
  selector: 'one-input-text',
  imports: [NgClass, InputLabelComponent],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [genericProvider(InputTextComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends BaseInputFormControl<InputStringType> {
  protected override extractValueFromEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    return input.value ? String(input.value) : null;
  }
}
