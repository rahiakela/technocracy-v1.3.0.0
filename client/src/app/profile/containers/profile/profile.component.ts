import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { RootStoreState} from '../../../root-store';
import { AuthActions, AuthSelectors } from '../../../root-store/auth-store';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/user-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tech-profile-container',
  template: `
    <tech-profile
      [user]="authenticatedUser"
      [loading]="loading | async"
      [loaded]="loaded | async"
      [error]="error | async"
      (onProfileActionTriggered)="profileActionHandler($event)"
    >
    </tech-profile>
  `
})
export class ProfileComponent implements OnInit {

  authenticatedUser: User;
  loading: Observable<boolean>;
  loaded: Observable<boolean>;
  error: Observable<any>;

  profileId: string;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get profile id from route
      this.profileId = params['id'];
    });
  }

  ngOnInit() {
    // get auth isLoading from store
    this.loading = this.store$.pipe(select(AuthSelectors.selectAuthIsLoading));
    // get auth isLoaded from store
    this.loaded = this.store$.pipe(select(AuthSelectors.selectAuthIsLoaded));
    // get auth error from store
    this.error = this.store$.pipe(select(AuthSelectors.selectAuthError));
    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);
  }

  // handle profile actions such as save
  profileActionHandler(data: any) {
    if (this.profileId === 'create') {
      if (data.action === 'updateProfileImage') {
        this.store$.dispatch(new AuthActions.UpdateProfilePhoto({userId: data.userId, user: data.user}));
      } else {
        this.store$.dispatch(new AuthActions.CreateProfile({user: this.authenticatedUser, profile: data}));
      }
    } else {
      if (data.action === 'updateProfileImage') {
        this.store$.dispatch(new AuthActions.UpdateProfilePhoto({userId: data.userId, user: data.user}));
      } else {
        this.store$.dispatch(new AuthActions.UpdateProfile({user: this.authenticatedUser, profile: data}));
      }
    }
  }

}
