import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {RootStoreState} from "../../../root-store";
import { AuthActions, AuthSelectors } from '../../../root-store/auth-store';
import {Observable} from "rxjs";
import {User} from "../../../shared/models/user-model";

@Component({
  selector: 'tech-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

  MAIL_VERIFY_VIEW = true;
  MAIL_VERIFIED_VIEW = false;
  MAIL_UPDATE_VIEW = false;
  MAIL_UPDATED_VIEW = false;
  MAIL_ACTIVATE_ERROR_VIEW = false;

  // The current registered user
  registeredUser: User;
  error: any;

  email = new FormControl('', [Validators.required, Validators.email]);
  updateMailForm = new FormGroup({email: this.email,});

  /**
   * True if the authentication is loading.
   */
  public loading: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute, public router: Router) {
    this.activeRoute.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        store$.dispatch(new AuthActions.AccountActivate({token}));
      }
    });
  }

  ngOnInit() {
    // get auth isLoading from store
    this.loading = this.store$.pipe(select(AuthSelectors.selectAuthIsLoading));
    // get auth error from store
    this.store$.pipe(select(AuthSelectors.selectAuthError))
      .subscribe(error => {
        if (error) {
          this.error = error;
          this.MAIL_ACTIVATE_ERROR_VIEW = true;
        }
      });

    // subscribe to store for registered user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.registeredUser = user);

    // subscribe to auth message and show/hide view accordingly
    this.store$.pipe(
      select(AuthSelectors.selectAuthMessage)
    )
      .subscribe((message: any) => {
        if (message) {
          if (message.verified) {
            this.showHideView(true, false, true, false);
          }
          if (message.updated) {
            this.showHideView(true, false, false, true);
          }
        }
      });

    // subscribe to store for activated user and forward to welcome page
    this.store$.pipe(select(AuthSelectors.selectActivatedUser))
      .subscribe(activatedUser => {
        if (activatedUser) {
          this.router.navigate(['/account/activated']);
        }
      });
  }

  resendAccountVerifyCode() {
    // extract email from registered user and dispatch email re-verify action
    if (this.registeredUser) {
      const { local: { email } } = this.registeredUser;
      this.store$.dispatch(new AuthActions.ReVerifyEmail({ email }))
    }
  }

  updateEmail() {
    // extract email from registered user and dispatch email update action
    if (this.registeredUser) {
      const { local: { email } } = this.registeredUser;
      this.store$.dispatch(new AuthActions.UpdateEmail({ newEmail: this.email.value, oldEmail: email}))
    }
  }

  showHideView(mail_verify_view?: boolean, mail_update_view?: boolean, mail_verified_view?: boolean, mail_updated_view?: boolean) {
    this.MAIL_UPDATE_VIEW = mail_update_view;
    this.MAIL_VERIFY_VIEW = mail_verify_view;
    this.MAIL_VERIFIED_VIEW = mail_verified_view;
    this.MAIL_UPDATED_VIEW = mail_updated_view;
  }

  showErrorView(isError: boolean) {
    this.MAIL_ACTIVATE_ERROR_VIEW = isError;
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email id' :
      this.email.hasError('email') ? 'Email id must contain @ character' :
        '';
  }
}
