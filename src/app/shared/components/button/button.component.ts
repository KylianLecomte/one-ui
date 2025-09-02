import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type TypeCssButton = 'default' | 'primary' | 'complementary' | 'icon' | 'tab';
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
  isAnimating = signal(false);

  clickEvent = output<void>();

  private readonly _btnRef = viewChild<ElementRef<HTMLButtonElement>>('btn');
  btn = computed(() => this._btnRef()?.nativeElement);

  constructor() {
    effect(() => {
      if (this.withAnimation()) {
        this.btn()?.addEventListener('animationend', (ev: AnimationEvent) => {
          if (ev.animationName.endsWith('shockwave')) {
            this.animationShockWaveFinished();
          }
        });
      }
    });
  }

  onClick() {
    if (this.withAnimation()) {
      this.isAnimating.set(false);
      requestAnimationFrame(() => this.isAnimating.set(true));
    }

    if (this.type() !== 'submit') {
      this.clickEvent.emit();
    }
  }

  animationShockWaveFinished() {
    this.withAnimation() && this.isAnimating.set(false);
  }

  destroy() {
    this.withAnimation() &&
      this.btn()?.removeEventListener('animationend', this.animationShockWaveFinished);
  }
}
