import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from "../../../root-store";
import { AuthActions, AuthSelectors } from '../../../root-store/auth-store';
import {Router} from "@angular/router";

@Component({
  selector: 'tech-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();
  username = new FormControl();
  recaptcha = new FormControl();

  signupForm: FormGroup;

  hide = true;

  /**
   * True if the authentication is loading.
   */
  public loading: Observable<boolean>;
  /**
   * The error if authentication fails.
   */
  public error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>, public router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    // get auth isLoading from store
    this.loading = this.store$.pipe(select(AuthSelectors.selectAuthIsLoading));
    // get auth error from store
    this.error = this.store$.pipe(select(AuthSelectors.selectAuthError));

    // subscribe to auth success and forward to account verify page
    this.store$.pipe(
      select(AuthSelectors.selectAuthenticatedUser)
    )
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/account/verify']);
        }
      });

    this.createSignupForm();
  }

  signUp() {
    const user = {
      email: this.email.value,
      password: this.password.value,
      username: this.username.value
    };

    // dispatch SignUpAction by passing payload
    this.store$.dispatch(new AuthActions.SignUp(user));
  }

  createSignupForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.recaptcha = new FormControl('', Validators.required);
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password,
      username: this.username,
      recaptcha: this.recaptcha
    });
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email id' :
      this.email.hasError('email') ? 'Email id must contain @ character' :
        '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Please provide your password' :
      this.password.hasError('minlength') ? 'Password must be at least 8 character long' :
        '';
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'Please choose your username' :
      this.username.hasError('minlength') ? 'Username must be at least 4 character long' :
        '';
  }

  openTermsAndConditions() {
    const dialogRef = this.dialog.open(TermsAndConditionsComponent);
  }

  openPrivacyPolicy() {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent);
  }
}

/*Mat Dialog components*/
@Component({
  selector: 'tech-terms-and-conditions',
  templateUrl: './privacy-policy/terms-and-conditions.component.html'
})
export class TermsAndConditionsComponent { }

@Component({
  selector: 'tech-privacy-policy',
  templateUrl: './privacy-policy/privacy-policy.component.html'
})
export class PrivacyPolicyComponent { }
