import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { genericProvider } from '../base/generic-provider.provider';

export type SelectOption<T = any> = {
  label: string;
  value: T;
  disabled?: boolean;
};

@Component({
  selector: 'one-select',
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [genericProvider(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T = any> extends SelectControlValueAccessor {
  id = input.required<string>();
  options = input.required<SelectOption<T>[]>();
  placeholder = input<string>();
}
