import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputFormControl, InputStringType } from '../base/base-input-form-control';
import { NgClass } from '@angular/common';
import { InputLabelComponent } from '../input-label/input-label.component';
import { genericProvider } from '../base/generic-provider.provider';

@Component({
  selector: 'one-input-textarea',
  imports: [NgClass, InputLabelComponent],
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.scss',
  providers: [genericProvider(InputTextareaComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextareaComponent extends BaseInputFormControl<InputStringType> {
  protected override extractValueFromEvent(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    return input.value ? String(input.value) : null;
  }
}
