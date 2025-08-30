import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFrequencyRuleComponent } from './task-frequency-rule.component';

describe('TaskFrequencyRuleComponent', () => {
  let component: TaskFrequencyRuleComponent;
  let fixture: ComponentFixture<TaskFrequencyRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFrequencyRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFrequencyRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
