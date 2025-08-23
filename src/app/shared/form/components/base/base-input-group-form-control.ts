import { computed, Directive, input, signal, Signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface State extends Option {
  isChecked: boolean;
  isDisabled: boolean;
}

@Directive({})
export abstract class BaseInputGroupFormControl<T = any> implements ControlValueAccessor {
  options = input.required<Option[]>();
  value!: T;
  disabled = signal(false);

  states: Signal<State[]> = computed(() =>
    this.options().map(
      (option: Option): State => ({
        ...option,
        isChecked: false,
        isDisabled: this.disabled(),
      })
    )
  );

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
    this.disabled.set(isDisabled);
  }

  protected onChange: (value: T) => void = () => {};

  protected onTouched: () => void = () => {};

  protected updateValue(value: T): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  protected abstract handleChange(event: Event, state: State): void;
}
