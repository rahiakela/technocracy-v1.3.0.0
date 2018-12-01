import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import { RootStoreState} from "../../../root-store";
import { AuthActions, AuthSelectors } from '../../../root-store/auth-store';

@Component({
  selector: 'tech-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  unsubscribeForm = new FormGroup({email: this.email});

  unsubscribed = false;
  loading: Observable<boolean>;
  error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
  }

  unsubscribe() {

  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email id' :
      this.email.hasError('email') ? 'Email id must contain @ character' :
        '';
  }
}
