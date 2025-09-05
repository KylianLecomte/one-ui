import { computed, Directive, input, signal, Signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface Option<T = any> {
  id: string;
  label: string;
  value: T;
}

export interface State<T = any> extends Option<T> {
  isChecked: boolean;
  isDisabled: boolean;
}

@Directive({})
export abstract class BaseInputGroupFormControl<T = any> implements ControlValueAccessor {
  options = input.required<Option[]>();
  protected value = signal<T | null>(null);
  protected disabled = signal(false);

  states: Signal<State[]> = computed(() =>
    this.options().map((option: Option): State => {
      const value = this.value();
      return {
        ...option,
        isChecked: Array.isArray(value) ? value.includes(option.value) : false,
        isDisabled: this.disabled(),
      };
    })
  );

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onChange: (value: T) => void = () => {};

  protected onTouched: () => void = () => {};

  protected updateValue(value: T): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  protected abstract handleChange(event: Event, state: State): void;
}
