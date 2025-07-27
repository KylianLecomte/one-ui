import { Component, input } from '@angular/core';

@Component({
  selector: 'one-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  libelle = input.required<string>();
  color = input.required<string>();
}
