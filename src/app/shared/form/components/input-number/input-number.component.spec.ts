import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberComponent } from './input-number.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

describe('InputNumberComponent', () => {
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;

  const inputId = signal('id');
  const inputLabel = signal('label');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputNumberComponent, {
      bindings: [inputBinding('id', inputId), inputBinding('label', inputLabel)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
