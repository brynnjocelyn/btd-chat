import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { matchPasswordsValidator } from './utils';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.page.html',
  styleUrls: ['./confirm-password-reset.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonAlert,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonText,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class ConfirmPasswordResetPage implements OnInit {
  form: FormGroup | undefined;
  token: string | null = null;
  success$: Observable<boolean> =
    this.authService.getResetPasswordSuccessFlag();
  message: string = '';
  countDown: number = 10;
  isAlertOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Get the token from the URL. It is the last segment of the URL.
    this.token = this.getTokenFromUrl();

    this.buildForm();
    this.successListener();
    this.authService.setResetPasswordSuccessFlag();
  }

  buildForm() {
    this.form = this.fb.group(
      {
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      { validators: matchPasswordsValidator() },
    );
  }

  successListener() {
    this.success$.subscribe((success) => {
      if (success) {
        this.isAlertOpen = true;
        this.message = `Password reset successful. Redirecting to login page in ${this.countDown} seconds.`;
        this.countDown = 10;
        const interval = setInterval(() => {
          this.countDown--;
          this.message = `Password reset successful. Redirecting to login page in ${this.countDown} seconds.`;
          if (this.countDown === 0) {
            this.isAlertOpen = false;
            clearInterval(interval);
          }
        }, 1000);
      }
    });
  }

  getTokenFromUrl(): string {
    const url = this.router.url;
    const urlSegments = url.split('/');
    return urlSegments[urlSegments.length - 1];
  }

  onSubmit() {
    if (this.form?.valid) {
      console.log('Form:', this.form.value);
      const { password, confirmPassword } = this.form.value;
      this.authService.resetPassword(this.token!, password, confirmPassword);
    }
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
