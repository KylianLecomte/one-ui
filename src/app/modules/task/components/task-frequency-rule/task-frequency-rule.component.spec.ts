import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFrequencyRuleComponent } from './task-frequency-rule.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TaskFrequencyRuleComponent', () => {
  let component: TaskFrequencyRuleComponent;
  let fixture: ComponentFixture<TaskFrequencyRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFrequencyRuleComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFrequencyRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
