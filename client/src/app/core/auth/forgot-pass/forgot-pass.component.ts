import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from "../../../root-store";
import {AuthSelectors, AuthActions} from "../../../root-store/auth-store";

@Component({
  selector: 'tech-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  forgotPassForm = new FormGroup({email: this.email});

  message: string;

  /**
   * True if the authentication is loading.
   */
  public loading: Observable<boolean>;
  /**
   * The error if authentication fails.
   */
  public error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>) { }

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
          if (message.mailSent) {
            this.message = 'A password reset mail notification has been sent to your mail account, please follow the instructions and reset your password.';
          }
        }
      });
  }

  forgotPassword() {
    // dispatch ForgotPassAction by passing payload
    this.store$.dispatch(new AuthActions.ForgotPassword({email: this.email.value}));
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email id' :
      this.email.hasError('email') ? 'Email id must contain @ character' :
        '';
  }
}
