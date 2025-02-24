import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment.prod';
import { logoGoogle, logoTwitter, logoFacebook } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInput: IonInput | undefined;

  pb: PocketBase;
  provider: string = '';

  loginForm: FormGroup | undefined;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.pb = new PocketBase(environment.pbBaseUrl); // Replace with your Pocketbase URL

    addIcons({
      logoGoogle,
      logoFacebook,
      logoTwitter,
    });
  }

  ngOnInit() {
    this.buildLoginForm();

    setInterval(() => {
      console.log(this.loginForm?.value, this.loginForm?.pristine);
    }, 1000);

    this.loginForm?.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
    });
  }

  ionViewDidEnter() {
    this.emailInput?.setFocus();
    console.log('activeElement', document.activeElement);
  }

  ngAfterViewInit() {}

  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm?.value;
    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);
    console.log('loginForm:', this.loginForm);
    this.pb
      .collection('users')
      .authWithPassword(email, password)
      .then((user) => {
        console.log('Logged in user:', user);
        this.router.navigate(['/tabs/home']);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }

  async loginWithProvider(provider: string) {
    this.provider = provider;
    try {
      const userCollection = this.pb.collection('users');
      console.log('userCollection:', userCollection);
      console.log('Fetching auth methods...');
      const authMethodsList = await userCollection.listAuthMethods();
      console.log('Auth methods:', authMethodsList);
      console.log('Auth methods:', authMethodsList);
      const providerInfo = authMethodsList.oauth2.providers.find(
        (p) => p.name === provider,
      );

      console.log('providerInfo:', providerInfo);
      /* if (providerInfo) {
        window.location.href = providerInfo.authURL; // Redirect to provider's login URL
      } else {
        console.error(`Provider ${provider} not found.`);
      } */
    } catch (error) {
      console.error('Error fetching auth methods:', error);
    }
  }

  async handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (code && state) {
      try {
        const user = await this.pb
          .collection('users')
          .authWithOAuth2({ provider: this.provider });
        console.log('Logged in user:', user);

        // Redirect to the main app
        this.router.navigate(['/tabs/home']);
      } catch (error) {
        console.error('Error during OAuth2 authentication:', error);
      }
    }
  }
}
