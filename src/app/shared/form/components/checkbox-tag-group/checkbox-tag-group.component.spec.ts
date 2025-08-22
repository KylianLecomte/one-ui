import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTagGroupComponent } from './checkbox-tag-group.component';

describe('CheckboxTagGroupComponent', () => {
  let component: CheckboxTagGroupComponent;
  let fixture: ComponentFixture<CheckboxTagGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxTagGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxTagGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
