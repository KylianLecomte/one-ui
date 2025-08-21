import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTagComponent } from './checkbox-tag.component';

describe('CheckboxTagComponent', () => {
  let component: CheckboxTagComponent;
  let fixture: ComponentFixture<CheckboxTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
