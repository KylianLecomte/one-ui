import { Component, input } from '@angular/core';

@Component({
  selector: 'cm-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  label = input.required<string>();
  color = input.required<string>();
}
