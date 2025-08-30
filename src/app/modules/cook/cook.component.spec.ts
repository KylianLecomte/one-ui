import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookComponent } from './cook.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CookHomeComponent', () => {
  let component: CookComponent;
  let fixture: ComponentFixture<CookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
