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
import {
  logoGoogle,
  logoTwitter,
  logoFacebook,
  logoX,
  logoApple,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../services/auth.service';
import { AuthProvider } from '../shared/api/list-auth-methods-response';
import { RegisterWithOAuthRequest } from '../shared/api/register-with-oauth-request';

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
export class LoginPage implements OnInit {
  @ViewChild('emailInput') emailInput: IonInput | undefined;

  pb: PocketBase;
  providers: AuthProvider[] = [];
  provider: string = '';

  loginForm: FormGroup | undefined;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.pb = new PocketBase(environment.pbBaseUrl); // Replace with your Pocketbase URL

    addIcons({
      logoGoogle,
      logoFacebook,
      logoTwitter,
      logoX,
      logoApple,
    });
  }

  ngOnInit() {
    this.auth.loadAvailableAuthMethods();
    this.buildLoginForm();

    this.authMethodListener();
  }

  ionViewDidEnter() {
    this.emailInput?.setFocus();
  }

  authMethodListener() {
    this.auth.getAvailableAuthMethods().subscribe((methods) => {
      console.log('Providers:', methods?.authProviders);
      this.providers = methods?.authProviders || [];
    });
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm?.value;
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
      const providerInfo = this.providers.find((p) => p.name === provider);

      console.log('providerInfo:', providerInfo);
      if (providerInfo) {
        // this.router.navigateByUrl(providerInfo.authUrl); // Redirect to provider's login URL
        const requestPayload: Omit<RegisterWithOAuthRequest, 'createData'> = {
          provider: providerInfo.name,
          redirectUrl: `http://localhost:8100/api/oauth2-redirect`,
          codeVerifier: providerInfo.codeVerifier,
          code: providerInfo.codeChallenge,
        };
        this.auth.loginWithProvider(requestPayload);
      } else {
        console.error(`Provider ${provider} not found.`);
      }
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
