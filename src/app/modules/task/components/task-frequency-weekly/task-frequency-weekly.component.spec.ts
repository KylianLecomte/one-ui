import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFrequencyWeeklyComponent } from './task-frequency-weekly.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

describe('TaskFrequencyWeeklyComponent', () => {
  let component: TaskFrequencyWeeklyComponent;
  let fixture: ComponentFixture<TaskFrequencyWeeklyComponent>;

  const inputWeeklyForm = signal(
    new FormGroup({
      frequencyType: new FormControl({}),
      selectedDays: new FormControl({}),
      repeatEvery: new FormControl({}),
      periodLength: new FormControl({}),
    })
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFrequencyWeeklyComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFrequencyWeeklyComponent, {
      bindings: [inputBinding('weeklyForm', inputWeeklyForm)],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
