import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthService } from '../../../auth/services/auth.service';
import { provideRouter } from '@angular/router';
import { TaskComponent } from '../../../task/task.component';
import { CookComponent } from '../../../cook/cook.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['get', 'post', 'put', 'delete']);

    await TestBed.configureTestingModule({
      imports: [MainMenuComponent, FaIconComponent],
      providers: [
        provideHttpClient(),
        provideZonelessChangeDetection(),
        { provide: 'AuthService', useClass: authServiceSpy },
        provideRouter([
          { path: '/task', component: TaskComponent },
          { path: '/cook', component: CookComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const harness = await RouterTestingHarness.create();
    // await harness.navigateByUrl('/user/123', UserProfile);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
