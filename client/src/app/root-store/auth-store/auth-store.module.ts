import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import {localStorageSync} from "ngrx-store-localstorage";

/**
* store user data after reload or page refresh and after window close
* ref:
* 1- https://github.com/btroncone/ngrx-store-localstorage
* 2- https://stackoverflow.com/questions/47581804/angular-ngrx-store-localstorage-dont-stored-data-after-reload
*/
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', authReducer, {metaReducers}),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [],
  providers: [AuthEffects]
})
export class AuthStoreModule { }
