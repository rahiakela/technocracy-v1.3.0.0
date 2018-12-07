import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from "../../core/services/auth.service";
import {Observable, of as observableOf} from "rxjs";
import {Action} from "@ngrx/store";
import * as AuthAction from './auth.actions';
import {catchError, map, switchMap} from "rxjs/operators";
import {ProfileService} from "../../core/services/profile.service";

/**
 * Effects offer a way to isolate and easily test side-effects within your application.
 */
@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService, private profileService: ProfileService, private actions$: Actions) {}

  /**
   * Authenticate user.
   */
  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.LoginRequest>(AuthAction.ActionTypes.LOGIN_REQUEST),
    switchMap(action =>
      this.authService
        .login(action.payload.email, action.payload.password)
        .pipe(
          map((user: any) => new AuthAction.LoginSuccess(user)),
          catchError(error => observableOf(new AuthAction.LoginFailure({error})))
        )
    )
  );

  /**
   * Create a new user.
   */
  @Effect()
  createUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.SignUp>(AuthAction.ActionTypes.SIGN_UP),
    switchMap(action =>
      this.authService
        .signup(action.payload.email, action.payload.password, action.payload.username)
        .pipe(
          map(user => new AuthAction.SignUpSuccess({user})),
          catchError(error => observableOf(new AuthAction.SignUpFailure({error})))
        )
    )
  );

  /**
   * Activate the user's account.
   */
  @Effect()
  accountActivateEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.AccountActivate>(AuthAction.ActionTypes.ACCOUNT_ACTIVATE),
    switchMap(action =>
      this.authService
        .activateAccount(action.payload.token)
        .pipe(
          map(user => new AuthAction.AccountActivateSuccess({activatedUser: user, user: user})),
          catchError(error => observableOf(new AuthAction.AccountActivateFailure({error})))
        )
    )
  );

  /**
   * Re-verify the user's email by sending verification code.
   */
  @Effect()
  reVerifyEmailEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.ReVerifyEmail>(AuthAction.ActionTypes.RE_VERIFY_EMAIL),
    switchMap(action =>
      this.authService
        .reVerifyEmail(action.payload.email)
        .pipe(
          map(message => new AuthAction.ReVerifyEmailSuccess({message})),
          catchError(error => observableOf(new AuthAction.ReVerifyEmailFailure({error})))
        )
    )
  );

  /**
   * Update the user's email by using old email.
   */
  @Effect()
  updateEmailEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.UpdateEmail>(AuthAction.ActionTypes.UPDATE_EMAIL),
    switchMap(action =>
      this.authService
        .updateEmail(action.payload.newEmail, action.payload.oldEmail)
        .pipe(
          map(message => new AuthAction.UpdateEmailSuccess({message})),
          catchError(error => observableOf(new AuthAction.UpdateEmailFailure({error})))
        )
    )
  );

  /**
   * Sent the password reset code to the user email account
   */
  @Effect()
  forgotPasswordEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.ForgotPassword>(AuthAction.ActionTypes.FORGOT_PASS),
    switchMap(action =>
      this.authService
        .forgotPassword(action.payload.email)
        .pipe(
          map(message => new AuthAction.ForgotPasswordSuccess({message})),
          catchError(error => observableOf(new AuthAction.ForgotPasswordFailure({error})))
        )
    )
  );

  /**
   * Reset the user's password using token.
   */
  @Effect()
  resetPasswordEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.ResetPassword>(AuthAction.ActionTypes.RESET_PASS),
    switchMap(action =>
      this.authService
        .resetPassword(action.payload.password, action.payload.token)
        .pipe(
          map(message => new AuthAction.ResetPasswordSuccess({message})),
          catchError(error => observableOf(new AuthAction.ResetPasswordFailure({error})))
        )
    )
  );

  /**
   * Save social user login details.
   */
  @Effect()
  saveSocialUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.SaveSocialUser>(AuthAction.ActionTypes.SAVE_SOCIAL_USER),
    switchMap(action =>
      this.authService
        .saveSocialUser(action.payload.user)
        .pipe(
          map(user => new AuthAction.SaveSocialUserSuccess({user})),
          catchError(error => observableOf(new AuthAction.SaveSocialUserFailure({error})))
        )
    )
  );

  /**
   * Logout the user by deleting user instance from store.
   */
  @Effect()
  logoutRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.SignOut>(AuthAction.ActionTypes.SIGN_OUT),
    switchMap(action => observableOf(new AuthAction.SignOutSuccess({user: action.payload.user,authenticated: action.payload.authenticated})))
  );

  /**
   * Load user profile details.
   */
  @Effect()
  loadProfileEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.LoadProfile>(AuthAction.ActionTypes.LOAD_PROFILE),
    switchMap(action =>
      this.profileService
        .getProfile(action.payload.user)
        .pipe(
          map(profile => new AuthAction.LoadProfileSuccess({profile: profile})),
          catchError(error => observableOf(new AuthAction.LoadProfileFailure({error})))
        )
    )
  );

  /**
   * Create user profile details.
   */
  @Effect()
  createProfileEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.CreateProfile>(AuthAction.ActionTypes.CREATE_PROFILE),
    switchMap(action =>
      this.profileService
        .saveProfile(action.payload.user, action.payload.profile)
        .pipe(
          map(profile => new AuthAction.CreateProfileSuccess({profile: profile})),
          catchError(error => observableOf(new AuthAction.CreateProfileFailure({error})))
        )
    )
  );

  /**
   * Update user profile details.
   */
  @Effect()
  updateProfileEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.UpdateProfile>(AuthAction.ActionTypes.UPDATE_PROFILE),
    switchMap(action =>
      this.profileService
        .updateProfile(action.payload.user, action.payload.profile)
        .pipe(
          map(profile => new AuthAction.UpdateProfileSuccess({profile: profile})),
          catchError(error => observableOf(new AuthAction.UpdateProfileFailure({error})))
        )
    )
  );

  /**
   * Update user profile photo.
   */
  @Effect()
  updateProfilePhotoEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.UpdateProfilePhoto>(AuthAction.ActionTypes.UPDATE_PROFILE_PHOTO),
    switchMap(action =>
      this.profileService
        .updateProfileImage(action.payload.userId, action.payload.user)
        .pipe(
          map(user => new AuthAction.UpdateProfilePhotoSuccess({user: user})),
          catchError(error => observableOf(new AuthAction.UpdateProfilePhotoFailure({error})))
        )
    )
  );

  /**
   * Subscribe email notification.
   */
  @Effect()
  subscribeEmailNotificationEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.SubscribeEmailNotification>(AuthAction.ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION),
    switchMap(action =>
      this.authService
        .subscribe(action.payload.email)
        .pipe(
          map(subscribed => new AuthAction.SubscribeEmailNotificationSuccess({subscribed: subscribed})),
          catchError(error => observableOf(new AuthAction.SubscribeEmailNotificationFailure({error})))
        )
    )
  );

  /**
   * Un-Subscribe email notification.
   */
  @Effect()
  unSubscribeEmailNotificationEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthAction.UnSubscribeEmailNotification>(AuthAction.ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION),
    switchMap(action =>
      this.authService
        .unsubscribe(action.payload.email)
        .pipe(
          map(subscribed => new AuthAction.UnSubscribeEmailNotificationSuccess({subscribed: subscribed})),
          catchError(error => observableOf(new AuthAction.UnSubscribeEmailNotificationFailure({error})))
        )
    )
  );

}
