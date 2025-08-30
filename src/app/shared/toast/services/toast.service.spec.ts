import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
