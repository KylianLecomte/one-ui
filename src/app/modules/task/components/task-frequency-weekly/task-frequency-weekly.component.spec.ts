import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFrequencyWeeklyComponent } from './task-frequency-weekly.component';

describe('TaskFrequencyWeeklyComponent', () => {
  let component: TaskFrequencyWeeklyComponent;
  let fixture: ComponentFixture<TaskFrequencyWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFrequencyWeeklyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFrequencyWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
