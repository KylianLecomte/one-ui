import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignIn } from '../../domain/dtos/auth.dto';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputTextComponent } from '../../../../shared/form/components/input-text/input-text.component';

@Component({
  selector: 'one-sign-in',
  imports: [ReactiveFormsModule, ButtonComponent, InputTextComponent],
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
