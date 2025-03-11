import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonTitle,
    IonIcon,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ForgotPasswordPage implements OnInit {
  email: FormControl<string | null> | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.email = new FormControl<string | null>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    });
  }

  onSubmit() {
    if (!!this.email && this.email.valid) {
      console.log('Email:', this.email.value);
      this.authService.sendResetPasswordEmail(this.email.value as string);
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
