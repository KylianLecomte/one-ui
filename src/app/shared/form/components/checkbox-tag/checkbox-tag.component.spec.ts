import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTagComponent } from './checkbox-tag.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

describe('CheckboxTagComponent', () => {
  let component: CheckboxTagComponent;
  let fixture: ComponentFixture<CheckboxTagComponent>;

  const inputId = signal('id');
  const inputLabel = signal('label');
  const inputCurrentValue = signal('currentValue');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxTagComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxTagComponent, {
      bindings: [
        inputBinding('id', inputId),
        inputBinding('label', inputLabel),
        inputBinding('currentValue', inputCurrentValue),
      ],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
