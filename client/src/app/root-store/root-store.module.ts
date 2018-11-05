import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import { BlogStoreModule } from './blog-store';
import {QuestionStoreModule} from './question-store';
import { AuthStoreModule } from './auth-store';


@NgModule({
  imports: [
    CommonModule,
    BlogStoreModule,
    QuestionStoreModule,
    AuthStoreModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot({
      router: routerReducer
    }),
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * Instrumentation must be imported after importing StoreModule (config is optional)
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'Technocracy NgRx Store',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router'
    })
  ],
  declarations: []
})
export class RootStoreModule { }
