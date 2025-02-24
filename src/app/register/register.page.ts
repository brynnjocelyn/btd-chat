import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from '../confirm-password-reset/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class RegisterPage implements OnInit {
  form: FormGroup | undefined;

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
