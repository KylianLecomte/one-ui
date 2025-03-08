import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookHomeComponent } from './cook-home.component';

describe('CookHomeComponent', () => {
  let component: CookHomeComponent;
  let fixture: ComponentFixture<CookHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
