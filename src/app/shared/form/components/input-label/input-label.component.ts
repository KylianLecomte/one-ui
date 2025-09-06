import { Component, input } from '@angular/core';
import { RequiredComponent } from '../../../../modules/form/components/required/required.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'one-input-label',
  imports: [RequiredComponent, NgClass],
  templateUrl: './input-label.component.html',
  styleUrl: './input-label.component.scss',
})
export class InputLabelComponent {
  id = input.required<string>();
  label = input<string>();
  isRequired = input<boolean>(false);
  labelIsHidden = input<boolean>(false);
  cssClassWrapper = input<string[]>([]);
}
