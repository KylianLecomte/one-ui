import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRepetitionRuleComponent } from './task-repetition-rule.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TaskRepetitionRuleComponent', () => {
  let component: TaskRepetitionRuleComponent;
  let fixture: ComponentFixture<TaskRepetitionRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRepetitionRuleComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskRepetitionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
