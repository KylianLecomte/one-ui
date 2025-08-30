import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableComponent } from './task-table.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('TaskRowComponent', () => {
  let component: TaskTableComponent;
  let fixture: ComponentFixture<TaskTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTableComponent],
      providers: [provideHttpClient(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
