import { TestBed } from '@angular/core/testing';

import { ContextMenuService } from './context-menu.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ContextMenuService', () => {
  let service: ContextMenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    service = TestBed.inject(ContextMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
