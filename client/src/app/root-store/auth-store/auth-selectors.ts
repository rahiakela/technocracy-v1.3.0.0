import {State} from "./auth-state";
import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {User} from "../../shared/models/user-model";


const getError = (state: State): any => state.error;

/**
 * Returns true if request is in progress.
 */
const getIsLoading  = (state: State): boolean => state.isLoading;

const getIsLoaded  = (state: State): boolean => state.loaded;

/**
 * Return the users state
 */
const getUserState = (state: State): any => state.user;

/**
 * Return the message state
 */
const getMessageState = (state: State): any => state.message;

/**
* Return the activated user state
*/
const getActivatedUserState = (state: State): any => state.activatedUser;

/**
 * Returns true if the user is authenticated.
 */
export const isAuthenticated = (state: State) => state.authenticated;

/**
 * Return the subscribed user state
 */
export const isSubscribed = (state: State) => state.subscribed;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>('user');

export const selectAuthError: MemoizedSelector<object, any> = createSelector(selectAuthState, getError);

export const selectAuthIsLoading: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getIsLoading);

export const selectAuthIsLoaded: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getIsLoaded);

export const selectAuthMessage: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getMessageState);
/**
 * Returns the authenticated user
 */
export const selectAuthenticatedUser: MemoizedSelector<object, User> = createSelector(selectAuthState, getUserState);

/**
 * Returns the authenticated user
 */
export const selectActivatedUser: MemoizedSelector<object, User> = createSelector(selectAuthState, getActivatedUserState);

/**
 * Returns true if the user is authenticated
 */
export const selectIsAuthenticated: MemoizedSelector<object, boolean> = createSelector(selectAuthState, isAuthenticated);

/**
 * Returns true if the user is subscribed
 */
export const selectIsSubscribed: MemoizedSelector<object, boolean> = createSelector(selectAuthState, isSubscribed);
