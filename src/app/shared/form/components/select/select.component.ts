import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { genericProvider } from '../base/generic-provider.provider';
import { BaseInputCvaWithLabel } from '../base/base-input-cva-with-label';
import { InputLabelComponent } from '../input-label/input-label.component';
import { NgClass } from '@angular/common';

export type SelectOption<T = any> = {
  label: string;
  value: T;
  disabled?: boolean;
};

@Component({
  selector: 'one-select',
  imports: [FormsModule, InputLabelComponent, NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [genericProvider(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T = any> extends BaseInputCvaWithLabel<T> {
  options = input.required<SelectOption<T>[]>();

  protected override extractValueFromEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    return input.value as T;
  }
}
