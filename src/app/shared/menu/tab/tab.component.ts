import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'one-tab',
  template: '',
})
export class TabComponent {
  label = input.required<string>();

  @ContentChild(TemplateRef) content!: TemplateRef<any>;
}
