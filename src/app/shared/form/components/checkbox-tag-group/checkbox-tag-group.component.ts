import { Component } from '@angular/core';
import { genericProvider } from '../base/generic-provider.provider';
import { BaseInputGroupFormControl, State } from '../base/base-input-group-form-control';
import { NgClass } from '@angular/common';

@Component({
  selector: 'one-checkbox-tag-group',
  imports: [NgClass],
  templateUrl: './checkbox-tag-group.component.html',
  styleUrl: './checkbox-tag-group.component.scss',
  providers: [genericProvider(CheckboxTagGroupComponent)],
})
export class CheckboxTagGroupComponent extends BaseInputGroupFormControl<string[]> {
  handleChange(event: Event, state: State) {
    const input = event.target as HTMLInputElement;
    let newValue: string[] = Array.isArray(this.value) ? [...this.value] : [];

    if (input.checked && !newValue.includes(state.value)) {
      newValue.push(state.value);
    } else {
      newValue = newValue.filter((d) => d !== state.value);
    }

    this.updateValue(newValue);
  }
}
