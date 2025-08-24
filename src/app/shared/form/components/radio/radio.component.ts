import { ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';
import { genericProvider } from '../base/generic-provider.provider';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { LabelPosition } from '../../../dtos/label-position.type';

@Component({
  selector: 'one-radio',
  imports: [ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [genericProvider(RadioComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements ControlValueAccessor {
  @Input() name!: string;

  @Input() value!: any;

  disabled = false;
  model: any;
  labelPosition = input<LabelPosition>('left');
  label = input<string>();
  cssLabelPosition = computed(() => {
    switch (this.labelPosition()) {
      case 'top':
        return 'flex-col';
      case 'bottom':
        return 'flex-col-reverse';
      case 'left':
        return 'flex-row';
      case 'right':
        return 'flex-row-reverse';
    }
  });

  select() {
    if (!this.disabled) {
      this.model = this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  writeValue(value: any): void {
    this.model = value;
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

  protected onChange: (value: any) => void = () => {};

  protected onTouched: () => void = () => {};
}
