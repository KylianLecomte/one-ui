import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { genericProvider } from '../base/generic-provider.provider';
import { RadioControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { LabelPosition } from '../../../dtos/label-position.type';

@Component({
  selector: 'one-radio',
  imports: [ReactiveFormsModule],
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
  labelPosition = input<LabelPosition>('left');
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

  override writeValue(value: any) {
    super.writeValue(value);
    this.selectedValue.set(value);
  }
}
