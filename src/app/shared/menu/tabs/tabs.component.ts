import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'one-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabs = contentChildren(TabComponent);

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
