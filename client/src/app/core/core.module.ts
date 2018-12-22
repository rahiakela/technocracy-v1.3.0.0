import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppMaterialModule} from '../app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { HomeContainerComponent } from './home/home-container.component';
import { RightSideBarComponent } from './layout/right-side-bar/right-side-bar.component';
import { LeftSideBarComponent } from './layout/left-side-bar/left-side-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TermsAndConditionsComponent } from './auth/signup/signup.component';
import { PrivacyPolicyComponent } from './auth/signup/signup.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { MenuBarComponent } from './layout/menu-bar/menu-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import {environment} from '../../environments/environment';
import { AccountVerificationComponent } from './auth/account-verification/account-verification.component';
import { AccountActivateComponent } from './auth/account-activate/account-activate.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule
} from 'angularx-social-login';
import {UserAuthObserver} from './observer/user-auth-observer';
import {SubscribeComponent} from './subscription/subscribe/subscribe.component';
import {UnsubscribeComponent} from './subscription/unsubscribe/unsubscribe.component';

// ref: https://www.npmjs.com/package/ng-recaptcha
const GLOBAL_RECAPTCHA_SETTINGS: RecaptchaSettings = { siteKey: '6LdMVz4UAAAAAClv3WheCRrgtoDyPUtFfGhikGu4' };

export function socialConfig() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('937434695670-1l0r52i8dk1c4m39hg1fa93jbs3ebp3v.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('538035956660855')
    },
    /*{
      id: LinkedInLoginProvider.PROVIDER_ID,
      provider: new LinkedInLoginProvider('81xmih7jo94hfi')
    }*/
  ]);

  return config;
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    SocialLoginModule,
    RecaptchaFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppMaterialModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    HomeContainerComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    LoginComponent,
    SignupComponent,
    ForgotPassComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    MenuBarComponent,
    AccountVerificationComponent,
    AccountActivateComponent,
    ResetPassComponent,
    SubscribeComponent,
    UnsubscribeComponent
  ],
  // Mat Dialog entry components config
  entryComponents: [SignupComponent, TermsAndConditionsComponent, PrivacyPolicyComponent],
  exports: [
    RightSideBarComponent,
    LeftSideBarComponent,
    MenuBarComponent
  ],
  providers: [
    UserAuthObserver,
    {provide: RECAPTCHA_SETTINGS, useValue: GLOBAL_RECAPTCHA_SETTINGS}, // Google reCaptcha settings
    {provide: AuthServiceConfig, useFactory: socialConfig}, // Social oAuth settings
    {provide: StorageBucket, useValue: 'technocracy-157812.appspot.com'}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
