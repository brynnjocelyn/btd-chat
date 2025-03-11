import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from '../confirm-password-reset/utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  form: FormGroup | undefined;
  success$: Observable<boolean> = this.authService.getRegistrationSuccessFlag();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group(
      {
        email: this.fb.control<string>('', [
          Validators.required,
          Validators.email,
        ]),
        password: this.fb.control<string>('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: this.fb.control<string>('', [Validators.required]),
      },
      { validators: matchPasswordsValidator },
    );
  }

  onSubmit() {
    if (this.form?.valid) {
      const [email, password, confirmPassword] = this.form.value;
      this.authService.register(email, password, confirmPassword);
    }
  }

  // Getters for form control errors
  get emailRequiredError() {
    return this.form?.get('email')?.hasError('required') && this.form?.touched;
  }
  get emailInvalidError() {
    return this.form?.get('email')?.hasError('email') && this.form?.touched;
  }
  get confirmPasswordMismatchError() {
    return this.form?.hasError('passwordsMismatch') && this.form?.touched;
  }
  get passwordRequiredError() {
    return (
      this.form?.get('password')?.hasError('required') && this.form?.touched
    );
  }
  get confirmPasswordRequiredError() {
    return (
      this.form?.get('confirmPassword')?.hasError('required') &&
      this.form?.touched
    );
  }
  get passwordMinLengthError() {
    return (
      this.form?.get('password')?.hasError('minlength') && this.form?.touched
    );
  }
}
