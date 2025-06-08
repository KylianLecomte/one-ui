import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignIn } from '../../domain/dtos/auth.dto';
import { RequiredComponent } from '../../../form/components/required/required.component';

@Component({
  selector: 'one-sign-in',
  imports: [ReactiveFormsModule, RequiredComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  private readonly authService: AuthService = inject(AuthService);

  onClickSubmit(): void {
    const payload: SignIn = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value,
    };

    this.authService.signIn(payload);
  }
}
