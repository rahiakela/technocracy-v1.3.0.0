import {Actions, ActionTypes} from './auth.actions';
import {initialState, State} from './auth-state';

/**
 * The auth reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 * @response {State} state the transformed state
 */
export function authReducer(state = initialState, action: Actions): State {

  switch (action.type) {

    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.SIGN_UP:
    case ActionTypes.RE_VERIFY_EMAIL:
    case ActionTypes.UPDATE_EMAIL:
    case ActionTypes.ACCOUNT_ACTIVATE:
    case ActionTypes.FORGOT_PASS:
    case ActionTypes.RESET_PASS:
    case ActionTypes.SAVE_SOCIAL_USER:
    case ActionTypes.LOAD_PROFILE:
    case ActionTypes.CREATE_PROFILE:
    case ActionTypes.UPDATE_PROFILE:
    case ActionTypes.UPDATE_PROFILE_PHOTO:
      return {...state, isLoading: true};

    case ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION:
    case ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION:
      return {...state, isLoading: true, subscribed: false, error: null};

    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.SAVE_SOCIAL_USER_SUCCESS:
    case ActionTypes.UPDATE_PROFILE_PHOTO_SUCCESS:
      return {...state, user: action.payload.user, authenticated: true, isLoading: false};

    case ActionTypes.SIGN_UP_SUCCESS:
      return {...state, user: action.payload.user, isLoading: false};

    case ActionTypes.ACCOUNT_ACTIVATE_SUCCESS:
      return {...state, activatedUser: action.payload.activatedUser, user: action.payload.activatedUser, isLoading: false};

    case ActionTypes.RE_VERIFY_EMAIL_SUCCESS:
    case ActionTypes.UPDATE_EMAIL_SUCCESS:
    case ActionTypes.FORGOT_PASS_SUCCESS:
    case ActionTypes.RESET_PASS_SUCCESS:
      return {...state, message: action.payload.message, isLoading: false};

    case ActionTypes.AUTHENTICATED:
      return {...state, isLoading: true};

    case ActionTypes.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user: action.payload.user,
        isLoading: false
      };

    case ActionTypes.SIGN_OUT:
      return {...state, user: action.payload.user, error: null, isLoading: true};

    case ActionTypes.SIGN_OUT_SUCCESS:
      return {...state, authenticated: false, user: null, isLoading: false};

    case ActionTypes.LOAD_PROFILE_SUCCESS:
    case ActionTypes.CREATE_PROFILE_SUCCESS:
    case ActionTypes.UPDATE_PROFILE_SUCCESS: {
      const updatedUser = Object.assign({}, state.user, action.payload.profile);

      return {
        ...state,
        user: updatedUser,
        isLoading: false
      };
    }

    case ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION_SUCCESS:
    case ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        subscribed: action.payload.subscribed,
        isLoading: false
      }
    }

    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.SIGN_UP_FAILURE:
    case ActionTypes.RE_VERIFY_EMAIL_FAILURE:
    case ActionTypes.UPDATE_EMAIL_FAILURE:
    case ActionTypes.ACCOUNT_ACTIVATE_FAILURE:
    case ActionTypes.FORGOT_PASS_FAILURE:
    case ActionTypes.RESET_PASS_FAILURE:
    case ActionTypes.SAVE_SOCIAL_USER_FAILURE:
    case ActionTypes.LOAD_PROFILE_FAILURE:
    case ActionTypes.CREATE_PROFILE_FAILURE:
    case ActionTypes.UPDATE_PROFILE_FAILURE:
    case ActionTypes.UPDATE_PROFILE_PHOTO_FAILURE:
      return {...state, error: action.payload.error, isLoading: false};

    case ActionTypes.SIGN_OUT_FAILURE:
      return {...state, authenticated: true, error: action.payload.error, isLoading: false};

    case ActionTypes.AUTHENTICATED_FAILURE:
      return {...state, error: action.payload.error.message, isLoading: false};

    case ActionTypes.SUBSCRIBE_EMAIL_NOTIFICATION_FAILURE:
    case ActionTypes.UNSUBSCRIBE_EMAIL_NOTIFICATION_FAILURE:
      return {...state, error: action.payload.error, subscribed: false, isLoading: false};

    default:
      return state;
  }
}
