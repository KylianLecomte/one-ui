import { Directive, input, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({})
export abstract class BaseInputFormControl<T = any> implements ControlValueAccessor {
  id = input.required<string>();
  label = input<string>();

  value = signal<T | null>(null);
  disabled = signal<boolean>(false);

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onChange: (value: T | null) => void = () => {};

  protected onTouched: () => void = () => {};

  protected updateValue(value: T | null): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  protected abstract handleChange(event: Event): void;
}
