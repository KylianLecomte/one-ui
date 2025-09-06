import { computed, Directive, input } from '@angular/core';
import { LabelPosition } from '../../../dtos/label-position.type';
import { getCssClassForLabelPosition } from '../../../utils/css-class.utils';
import { BaseInputFormControl } from './base-input-form-control';

@Directive({})
export abstract class BaseInputCvaWithLabel<T = any> extends BaseInputFormControl<T> {
  isRequired = input<boolean>(false);
  labelPosition = input.required<LabelPosition>();
  cssClassInput = input<string[]>([]);

  labelIsHidden = computed(() => this.labelPosition() === 'hidden' || !this.label());
  cssLabelPosition = computed(() => getCssClassForLabelPosition(this.labelPosition()));

  protected get cssClassWrapper(): string[] {
    return [this.cssLabelPosition(), this.labelPosition()];
  }
}
