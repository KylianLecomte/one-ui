import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWeeklyRepetitionComponent } from './task-weekly-repetition.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

describe('TaskWeeklyRepetitionComponent', () => {
  let component: TaskWeeklyRepetitionComponent;
  let fixture: ComponentFixture<TaskWeeklyRepetitionComponent>;

  const inputWeeklyForm = signal(
    new FormGroup({
      repetitionRuleType: new FormControl({}),
      weekDays: new FormControl({}),
      repeatEvery: new FormControl({}),
      periodLength: new FormControl({}),
    })
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskWeeklyRepetitionComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskWeeklyRepetitionComponent, {
      bindings: [inputBinding('weeklyForm', inputWeeklyForm)],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
