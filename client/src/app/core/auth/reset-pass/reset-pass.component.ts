import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from "../../../root-store";
import {AuthSelectors, AuthActions} from "../../../root-store/auth-store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tech-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  PASS_RESET_SUCCESS = false;

  password = new FormControl();
  confirmPassword = new FormControl();

  resetPassForm: FormGroup;

  hide = true;
  message: string;
  token: string;

  /**
   * True if the authentication is loading.
   */
  public loading: Observable<boolean>;
  /**
   * The error if authentication fails.
   */
  public error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit() {
    // get auth isLoading from store
    this.loading = this.store$.pipe(select(AuthSelectors.selectAuthIsLoading));
    // get auth error from store
    this.error = this.store$.pipe(select(AuthSelectors.selectAuthError));

    // subscribe to auth message and show/hide view accordingly
    this.store$.pipe(
      select(AuthSelectors.selectAuthMessage)
    )
      .subscribe((message: any) => {
        if (message) {
          if (message.resetPass) {
            this.PASS_RESET_SUCCESS = true;
          }
        }
      });

    this.createResetPassForm();
  }

  resetPassword() {

    if (this.password.value !== this.confirmPassword.value) {
      this.message = 'Password does not match with confirm password';
      return;
    }

    if (this.token && (this.password.value === this.confirmPassword.value)) {
      const credentials = {
        password: this.password.value,
        token: this.token,
      };
      // dispatch Reset Password Action by passing payload
      this.store$.dispatch(new AuthActions.ResetPassword(credentials));
    }
  }

  createResetPassForm() {
    this.password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    this.resetPassForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Please provide your password' :
      this.password.hasError('minlength') ? 'Password must be at least 8 character long' :
        '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'Please provide confirm password' :
      this.confirmPassword.hasError('minlength') ? 'Password must be at least 8 character long' :
        '';
  }
}
