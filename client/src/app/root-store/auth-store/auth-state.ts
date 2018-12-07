import {User} from '../../shared/models/user-model';

/**
* This interface includes a user state. This interface is extended to include
* any additional interface properties.This is a standard feature module so not extended by EntityState.
*/
export interface State {
  user?: User | null;
  activatedUser?: User | null;
  authenticated?: boolean; // boolean if user is authenticated
  subscribed: boolean; // boolean if user is subscribed for email notification
  isLoading: boolean;
  loaded: boolean;
  message?: any;
  error?: any;
}

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = {
  user: null,
  activatedUser: null,
  subscribed: false,
  isLoading: false,
  loaded: false,
  message: null,
  error: null
};
