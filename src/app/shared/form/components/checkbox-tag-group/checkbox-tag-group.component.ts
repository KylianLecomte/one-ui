import { Component, computed, input, Signal } from '@angular/core';
import { genericProvider } from '../base/generic-provider.provider';
import { BaseInputGroupFormControl, Option, State } from '../base/base-input-group-form-control';

@Component({
  selector: 'one-checkbox-tag-group',
  imports: [],
  templateUrl: './checkbox-tag-group.component.html',
  styleUrl: './checkbox-tag-group.component.scss',
  providers: [genericProvider(CheckboxTagGroupComponent)],
})
export class CheckboxTagGroupComponent extends BaseInputGroupFormControl<string[]> {
  options = input.required<Option[]>();

  states: Signal<State[]> = computed(() =>
    this.options().map(
      (option: Option): State => ({
        ...option,
        isChecked: false,
        isDisabled: false,
      })
    )
  );

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
