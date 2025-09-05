import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { genericProvider } from '../base/generic-provider.provider';
import { RadioControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { LabelPosition } from '../../../dtos/label-position.type';
import { getCssClassForLabelPosition } from '../../../utils/css-class.utils';
import { NgClass } from '@angular/common';

@Component({
  selector: 'one-radio',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [genericProvider(RadioComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends RadioControlValueAccessor {
  id = input.required<string>();
  label = input<string>();
  disabled = signal(false);
  selectedValue = signal<any>(null);

  labelPosition = input<LabelPosition>('right');
  cssLabelPosition = computed(() => getCssClassForLabelPosition(this.labelPosition()));

  override writeValue(value: any) {
    super.writeValue(value);
    this.selectedValue.set(value);
  }
}
