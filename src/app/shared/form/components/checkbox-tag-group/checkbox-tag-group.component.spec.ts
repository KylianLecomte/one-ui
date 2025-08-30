import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTagGroupComponent } from './checkbox-tag-group.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

describe('CheckboxTagGroupComponent', () => {
  let component: CheckboxTagGroupComponent;
  let fixture: ComponentFixture<CheckboxTagGroupComponent>;

  const inputOptions = signal([{ id: '1', label: 'Label 1', value: 'value 1' }]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxTagGroupComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxTagGroupComponent, {
      bindings: [inputBinding('options', inputOptions)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
