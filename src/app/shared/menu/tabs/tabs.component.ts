import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'cm-tabs',
  imports: [NgTemplateOutlet, ButtonComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabs: Signal<readonly TabComponent[]> = contentChildren(TabComponent);

  selectedTab: WritableSignal<TabComponent | undefined> = signal(undefined);

  constructor() {
    effect(() => {
      this.selectedTab.set(this.tabs()[0] ? this.tabs()[0] : undefined);
    });
  }

  setSelectedTab(tab: TabComponent | undefined): void {
    this.selectedTab.set(tab);
  }
}
