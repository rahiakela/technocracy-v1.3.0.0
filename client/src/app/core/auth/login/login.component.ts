import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import { RootStoreState} from "../../../root-store";
import { AuthActions, AuthSelectors } from '../../../root-store/auth-store';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import {UserAuthObserver} from "../../observer/user-auth-observer";


@Component({
  selector: 'tech-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl();
  password = new FormControl();

  loginForm: FormGroup;

  hide = true;

  public loading: Observable<boolean>;
  public error: Observable<any>;

  // prevent gmail auto login issue
  private socialAuth = false;

  returnUrl: string;

  constructor(private store$: Store<RootStoreState.State>,
              private authService: AuthService,
              private userAuthObserver: UserAuthObserver,
              private route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    // get redirect url from route to redirect to previous page or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    // get auth isLoading from store
    this.loading = this.store$.pipe(select(AuthSelectors.selectAuthIsLoading));
    // get auth error from store
    this.error = this.store$.pipe(select(AuthSelectors.selectAuthError));

    // subscribe to auth success and forward to home page
    this.store$.pipe(
      select(AuthSelectors.selectIsAuthenticated)
    )
      .subscribe(authenticated => {
        if (authenticated) {
          this.userAuthObserver.pushIsAuthenticated(true);
          this.router.navigateByUrl(this.returnUrl);
        }
    });

    // Subscribe to the authentication state
    this.authService.authState.subscribe((user) => {
      if (user && this.socialAuth) {
        this.store$.dispatch(new AuthActions.SaveSocialUser({user}));
      }
    });

    this.createLoginForm();
  }

  login() {
    const credentials = {
      email: this.email.value,
      password: this.password.value
    };
    // dispatch LoginAction by passing payload
    this.store$.dispatch(new AuthActions.LoginRequest(credentials));
  }

  loginWithGoogle() {
    this.socialAuth = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook() {
    this.socialAuth = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  createLoginForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
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

  ngOnDestroy() {

  }
}
