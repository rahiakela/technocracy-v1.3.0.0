import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import { RootStoreState} from "../../../root-store";
import { AuthActions, AuthSelectors } from '../../../root-store/auth-store';

@Component({
  selector: 'tech-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  subscribeForm = new FormGroup({email: this.email});

  subscription = {
    'title': 'Technocracy Blog Forum!',
    'description': 'Technocracy is an online forum for technocrats where they share his knowledge with like minded people.'
  };

  subscribed = false;
  loading: Observable<boolean>;
  error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    // get isLoading from store
    this.loading = this.store$.pipe(select(AuthSelectors.selectAuthIsLoading));
    // get error from store
    this.error = this.store$.pipe(select(AuthSelectors.selectAuthError));

    // subscribe to get subscribed success
    this.store$.pipe(select(AuthSelectors.selectIsSubscribed))
      .subscribe(subscribed => this.subscribed = subscribed);

  }

  subscribe() {
    // dispatch subscribe action by passing payload
    this.store$.dispatch(new AuthActions.SubscribeEmailNotification({email: this.email.value}));
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email id' :
      this.email.hasError('email') ? 'Email id must contain @ character' :
        '';
  }
}
