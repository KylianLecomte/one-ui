import { Directive, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputFormControl),
      multi: true,
    },
  ],
})
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
