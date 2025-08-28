import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
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
export class SelectComponent<T = any> implements ControlValueAccessor {
  options = input.required<SelectOption<T>[]>();
  placeholder = input<string>();

  value: T | null = null;
  private disabled = false;

  get isDisabled() {
    return this.disabled;
  }

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(value: T | null) {
    this.value = value;
    this.onChange(value);
  }

  protected onChange: (value: T | null) => void = () => {};

  protected onTouched: () => void = () => {};
}
