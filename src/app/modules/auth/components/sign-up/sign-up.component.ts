import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUp } from '../../domain/dtos/auth.dto';
import { RequiredComponent } from '../../../form/components/required/required.component';
import { equalValuesValidator } from '../../../../shared/form/validators/equalValuesValidator';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'one-sign-up',
  imports: [ReactiveFormsModule, RequiredComponent, ButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  signUpForm: FormGroup = this.formBuilder.group(
    {
      email: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      password: this.formBuilder.control<string>('', Validators.required),
      confirmationPassword: this.formBuilder.control<string>('', Validators.required),
    },
    {
      validator: equalValuesValidator('password', 'confirmationPassword'),
    }
  );

  onClickSubmit(): void {
    const payload: SignUp = {
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
    };

    this.authService.signUp(payload);
  }
}
