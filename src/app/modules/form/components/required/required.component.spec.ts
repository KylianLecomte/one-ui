import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredComponent } from './required.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('RequiredComponent', () => {
  let component: RequiredComponent;
  let fixture: ComponentFixture<RequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
