import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noAuthGuard } from './no-auth.guard';
import { provideZonelessChangeDetection } from '@angular/core';

describe('noAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => noAuthGuard(...guardParameters));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
