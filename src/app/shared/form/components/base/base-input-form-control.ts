import { computed, Directive, input, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { getCssClassForLabelPosition } from '../../../utils/css-class.utils';
import { LabelPosition } from '../../../dtos/label-position.type';

export type InputStringType = string | null;
export type InputNumberType = number | null;

@Directive({})
export abstract class BaseInputFormControl<T = any> implements ControlValueAccessor {
  id = input.required<string>();
  label = input<string>();
  placeholder = input<string>('');
  isRequired = input<boolean>(false);
  labelPosition = input<LabelPosition>('top');
  cssInputClass = input<string>('');

  value = signal<T | null>(null);
  disabled = signal<boolean>(false);

  labelIsHidden = computed(() => this.labelPosition() === 'hidden' || !this.label());
  cssLabelPosition = computed(() => getCssClassForLabelPosition(this.labelPosition()));

  protected get cssClassBase(): string[] {
    return ['ctn-input', this.cssLabelPosition(), this.labelPosition()];
  }

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

  protected handleChange(event: Event): void {
    this.updateValue(this.extractValueFromEvent(event));
  }

  protected abstract extractValueFromEvent(event: Event): T;
}
