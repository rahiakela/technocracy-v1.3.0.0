import { Action } from '@ngrx/store';
import {User} from '../../shared/models/user-model';
import {SocialUser} from "angularx-social-login";
import {Profile} from "../../shared/models/profile-model";

export enum ActionTypes {
  LOGIN_REQUEST         = '[users] Login Request',
  LOGIN_FAILURE         = '[users] Login Failure',
  LOGIN_SUCCESS         = '[users] Login Success',

  AUTHENTICATED         = '[users] Authenticated',
  AUTHENTICATED_FAILURE = '[users] Authenticated Failure',
  AUTHENTICATED_SUCCESS = '[users] Authenticated Success',

  SIGN_OUT              = '[users] Sign off',
  SIGN_OUT_FAILURE      = '[users] Sign off Failure',
  SIGN_OUT_SUCCESS      = '[users] Sign off Success',

  SIGN_UP               = '[users] Sign up',
  SIGN_UP_FAILURE       = '[users] Sign up Failure',
  SIGN_UP_SUCCESS       = '[users] Sign up Success',

  ACCOUNT_ACTIVATE      = '[users] Account activate',
  ACCOUNT_ACTIVATE_FAILURE = '[users] Account activate Failure',
  ACCOUNT_ACTIVATE_SUCCESS = '[users] Account activate Success',

  RE_VERIFY_EMAIL       = '[users] Re-verify email',
  RE_VERIFY_EMAIL_FAILURE = '[users] Re-verify email Failure',
  RE_VERIFY_EMAIL_SUCCESS = '[users] Re-verify email Success',

  UPDATE_EMAIL          = '[users] Update email',
  UPDATE_EMAIL_FAILURE  = '[users] Update email Failure',
  UPDATE_EMAIL_SUCCESS  = '[users] Update email Success',

  FORGOT_PASS           = '[users] Forgot password',
  FORGOT_PASS_FAILURE   = '[users] Forgot password Failure',
  FORGOT_PASS_SUCCESS   = '[users] Forgot password Success',

  RESET_PASS            = '[users] Reset password',
  RESET_PASS_FAILURE    = '[users] Reset password Failure',
  RESET_PASS_SUCCESS    = '[users] Reset password Success',

  SAVE_SOCIAL_USER      = '[users] Save Social User',
  SAVE_SOCIAL_USER_FAILURE   = '[users] Save Social User Failure',
  SAVE_SOCIAL_USER_SUCCESS   = '[users] Save Social User Success',

  LOAD_PROFILE           = '[users] Load Profile',
  LOAD_PROFILE_FAILURE   = '[users] Load Profile Failure',
  LOAD_PROFILE_SUCCESS   = '[users] Load Profile Success',

  CREATE_PROFILE         = '[users] Create Profile',
  CREATE_PROFILE_FAILURE = '[users] Create Profile Failure',
  CREATE_PROFILE_SUCCESS = '[users] Create Profile Success',

  UPDATE_PROFILE         = '[users] Update Profile',
  UPDATE_PROFILE_FAILURE = '[users] Update Profile Failure',
  UPDATE_PROFILE_SUCCESS = '[users] Update Profile Success',

  UPDATE_PROFILE_PHOTO   = '[users] Update Profile Photo',
  UPDATE_PROFILE_PHOTO_FAILURE = '[users] Update Profile Photo Failure',
  UPDATE_PROFILE_PHOTO_SUCCESS = '[users] Update Profile Photo Success',

  SUBSCRIBE_EMAIL_NOTIFICATION         = '[users] Subscribe Email Notification',
  SUBSCRIBE_EMAIL_NOTIFICATION_FAILURE = '[users] Subscribe Email Notification Failure',
  SUBSCRIBE_EMAIL_NOTIFICATION_SUCCESS = '[users] Subscribe Email Notification Success',

  UNSUBSCRIBE_EMAIL_NOTIFICATION         = '[users] Un-Subscribe Email Notification',
  UNSUBSCRIBE_EMAIL_NOTIFICATION_FAILURE = '[users] Un-Subscribe Email Notification Failure',
  UNSUBSCRIBE_EMAIL_NOTIFICATION_SUCCESS = '[users] Un-Subscribe Email Notification Success',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * User Login Actions: Authenticate the user against credentials
 */
export class LoginRequest implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;

  constructor(public payload: {email: string; password: string}) {}
}
export class LoginFailure implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class LoginSuccess implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
* User Authenticated Actions: Checks if user is authenticated.
*/
export class Authenticated implements Action {
  public type: string = ActionTypes.AUTHENTICATED;

  constructor(public payload: {token: string}) {}
}
export class AuthenticatedSuccess implements Action {
  public type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  constructor(public payload: {authenticated: boolean, user: User}) {}
}
export class AuthenticatedFailure implements Action {
  public type: string = ActionTypes.AUTHENTICATED_FAILURE;

  constructor(public payload: {error: any}) {}
}

/**
 * User Sign out: Logout the user from application
 */
export class SignOut implements Action {
  public type: string = ActionTypes.SIGN_OUT;
  constructor(public payload?: any) {}
}
export class SignOutSuccess implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}
export class SignOutFailure implements Action {
  public type: string = ActionTypes.SIGN_OUT_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Sign up Actions: Register the user
 */
export class SignUp implements Action {
  public type: string = ActionTypes.SIGN_UP;
  constructor(public payload: {email: string; password: string, username: string}) {}
}
export class SignUpSuccess implements Action {
  public type: string = ActionTypes.SIGN_UP_SUCCESS;
  constructor(public payload: { user: User }) {}
}
export class SignUpFailure implements Action {
  public type: string = ActionTypes.SIGN_UP_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Account Activate Actions: Activate the user's account by using activate token
 */
export class AccountActivate implements Action {
  public type: string = ActionTypes.ACCOUNT_ACTIVATE;
  constructor(public payload: {token: string}) {}
}
export class AccountActivateSuccess implements Action {
  public type: string = ActionTypes.ACCOUNT_ACTIVATE_SUCCESS;
  constructor(public payload: { activatedUser: User, user: User }) {}
}
export class AccountActivateFailure implements Action {
  public type: string = ActionTypes.ACCOUNT_ACTIVATE_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Mail Re-verify Actions: Re-verify the user's mail id
 */
export class ReVerifyEmail implements Action {
  public type: string = ActionTypes.RE_VERIFY_EMAIL;
  constructor(public payload: {email: string}) {}
}
export class ReVerifyEmailSuccess implements Action {
  public type: string = ActionTypes.RE_VERIFY_EMAIL_SUCCESS;
  constructor(public payload: { message: any }) {}
}
export class ReVerifyEmailFailure implements Action {
  public type: string = ActionTypes.RE_VERIFY_EMAIL_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Mail Update Actions: Update the user's old mail id with new one
 */
export class UpdateEmail implements Action {
  public type: string = ActionTypes.UPDATE_EMAIL;
  constructor(public payload: {oldEmail: string, newEmail: string}) {}
}
export class UpdateEmailSuccess implements Action {
  public type: string = ActionTypes.UPDATE_EMAIL_SUCCESS;
  constructor(public payload: { message: any }) {}
}
export class UpdateEmailFailure implements Action {
  public type: string = ActionTypes.UPDATE_EMAIL_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Forgot Password Actions: Send the reset password code to the user using the email
 */
export class ForgotPassword implements Action {
  public type: string = ActionTypes.FORGOT_PASS;
  constructor(public payload: {email: string}) {}
}
export class ForgotPasswordSuccess implements Action {
  public type: string = ActionTypes.FORGOT_PASS_SUCCESS;
  constructor(public payload: { message: any }) {}
}
export class ForgotPasswordFailure implements Action {
  public type: string = ActionTypes.FORGOT_PASS_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Reset Password Actions: Reset the user's password using token
 */
export class ResetPassword implements Action {
  public type: string = ActionTypes.RESET_PASS;
  constructor(public payload: {password: string, token: string}) {}
}
export class ResetPasswordSuccess implements Action {
  public type: string = ActionTypes.RESET_PASS_SUCCESS;
  constructor(public payload: { message: any }) {}
}
export class ResetPasswordFailure implements Action {
  public type: string = ActionTypes.RESET_PASS_FAILURE;
  constructor(public payload: {error: string}) {}
}

/**
 * User Social Login Actions: Save the social user login details
 */
export class SaveSocialUser implements Action {
  readonly type = ActionTypes.SAVE_SOCIAL_USER;

  constructor(public payload: {user: SocialUser}) {}
}
export class SaveSocialUserFailure implements Action {
  readonly type = ActionTypes.SAVE_SOCIAL_USER_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class SaveSocialUserSuccess implements Action {
  readonly type = ActionTypes.SAVE_SOCIAL_USER_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
 * User Profile Load Actions: Load the user profile details
 */
export class LoadProfile implements Action {
  readonly type = ActionTypes.LOAD_PROFILE;

  constructor(public payload: {user: User}) {}
}
export class LoadProfileFailure implements Action {
  readonly type = ActionTypes.LOAD_PROFILE_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class LoadProfileSuccess implements Action {
  readonly type = ActionTypes.LOAD_PROFILE_SUCCESS;

  constructor(public payload: { profile: Profile }) {}
}

/**
 * User Profile Create Actions: Create the user profile details
 */
export class CreateProfile implements Action {
  readonly type = ActionTypes.CREATE_PROFILE;

  constructor(public payload: {user: User, profile: any}) {}
}
export class CreateProfileFailure implements Action {
  readonly type = ActionTypes.CREATE_PROFILE_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class CreateProfileSuccess implements Action {
  readonly type = ActionTypes.CREATE_PROFILE_SUCCESS;

  constructor(public payload: { profile: Profile }) {}
}

/**
 * User Profile Update Actions: Update the user profile details
 */
export class UpdateProfile implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE;

  constructor(public payload: {user: User, profile: any}) {}
}
export class UpdateProfileFailure implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: { profile: Profile }) {}
}

/**
 * Subscribe Email Notification Actions
 */
export class SubscribeEmailNotification implements Action {
  readonly type = ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION;

  constructor(public payload: {email: string}) {}
}
export class SubscribeEmailNotificationFailure implements Action {
  readonly type = ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class SubscribeEmailNotificationSuccess implements Action {
  readonly type = ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION_SUCCESS;

  constructor(public payload: { subscribed: boolean }) {}
}

/**
 * Un-Subscribe Email Notification Actions
 */
export class UnSubscribeEmailNotification implements Action {
  readonly type = ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION;

  constructor(public payload: {email: string}) {}
}
export class UnSubscribeEmailNotificationFailure implements Action {
  readonly type = ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class UnSubscribeEmailNotificationSuccess implements Action {
  readonly type = ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION_SUCCESS;

  constructor(public payload: { subscribed: boolean }) {}
}

/**
 * User Profile Photo Update Actions: Update the user profile photo
 */
export class UpdateProfilePhoto implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_PHOTO;

  constructor(public payload: {userId: string, user: any}) {}
}
export class UpdateProfilePhotoFailure implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_PHOTO_FAILURE;

  constructor(public payload: { error: any }) {}
}
export class UpdateProfilePhotoSuccess implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_PHOTO_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = LoginRequest
  | LoginSuccess
  | LoginFailure
  | Authenticated
  | AuthenticatedSuccess
  | AuthenticatedFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | SignOut
  | SignOutSuccess
  | SignOutFailure
  | AccountActivate
  | AccountActivateSuccess
  | AccountActivateFailure
  | ReVerifyEmail
  | ReVerifyEmailSuccess
  | ReVerifyEmailFailure
  | UpdateEmail
  | UpdateEmailSuccess
  | UpdateEmailFailure
  | ForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | SaveSocialUser
  | SaveSocialUserSuccess
  | SaveSocialUserFailure
  | LoadProfile
  | LoadProfileSuccess
  | LoadProfileFailure
  | CreateProfile
  | CreateProfileSuccess
  | CreateProfileFailure
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFailure
  | UpdateProfilePhoto
  | UpdateProfilePhotoSuccess
  | UpdateProfilePhotoFailure;
