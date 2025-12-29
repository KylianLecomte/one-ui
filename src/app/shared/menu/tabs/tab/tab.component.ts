import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cm-tab',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  label = input.required<string>();

  @ContentChild(TemplateRef) content!: TemplateRef<any>;
}
