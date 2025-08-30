import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideZonelessChangeDetection()],
    }).compileComponents();

    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
