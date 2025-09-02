import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type TypeCssButton = 'default' | 'primary' | 'secondary' | 'icon' | 'tab';
export type TypeButton = 'button' | 'submit' | 'reset';

@Component({
  selector: 'one-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  destroyRef = inject(DestroyRef);

  typeCss = input<TypeCssButton>('default');
  type = input<TypeButton>('button');
  withAnimation = input<boolean>(true);

  btn = viewChild<ElementRef<HTMLButtonElement>>('btn');

  clickEvent = output<void>();

  constructor() {
    effect(() => {
      if (this.withAnimation()) {
        this.btn()?.nativeElement.addEventListener('animationend', (ev) => {
          if (ev.animationName.endsWith('shockwave')) {
            this.animationShockWaveFinished();
          }
        });
      }
    });
  }

  onClick() {
    console.log('click');
    this.withAnimation() && this.btn()?.nativeElement.classList.add('shockwave');

    if (this.type() !== 'submit') {
      this.clickEvent.emit();
    }
  }

  animationShockWaveFinished() {
    this.withAnimation() && this.btn()?.nativeElement.classList.remove('shockwave');
  }

  destroy() {
    this.withAnimation() &&
      this.btn()?.nativeElement.removeEventListener(
        'animationend',
        this.animationShockWaveFinished
      );
  }
}
