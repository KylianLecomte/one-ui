import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputStringType } from '../base/base-input-form-control';
import { NgClass } from '@angular/common';
import { InputLabelComponent } from '../input-label/input-label.component';
import { genericProvider } from '../base/generic-provider.provider';
import { BaseInputCvaWithLabel } from '../base/base-input-cva-with-label';

@Component({
  selector: 'one-textarea',
  imports: [NgClass, InputLabelComponent],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [genericProvider(TextareaComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends BaseInputCvaWithLabel<InputStringType> {
  protected override extractValueFromEvent(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    return input.value ? String(input.value) : null;
  }
}
