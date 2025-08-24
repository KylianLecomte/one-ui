import { Directive, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({})
export abstract class BaseInputFormControl<T = any> implements ControlValueAccessor {
  id = input.required<string>();
  label = input<string>();

  value!: T;
  disabled = false;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onChange: (value: T) => void = () => {};

  protected onTouched: () => void = () => {};

  protected updateValue(value: T): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  protected abstract handleChange(event: Event): void;
}
