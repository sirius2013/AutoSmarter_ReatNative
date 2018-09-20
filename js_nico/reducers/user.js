import { REHYDRATE } from 'redux-persist/constants';
import type { Action } from '../actions/types';
import { SET_USER, SIGN_IN, SIGN_OUT, RENEW_TOKEN } from '../actions/user';

const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  auth_token: '',
  isSignedIn: false,
  errorMessage: ''
};

export type State = {
  ...initialState
};

export default function (state:State = initialState, action:Action): State {
  switch(action.type){
  case REHYDRATE:
    const savedData = action.payload.user || initialState;
    return Object.assign({}, state, {
      ...savedData
    });
  case SET_USER:
    return Object.assign({}, state, {
      ...action.payload
    });
  case SIGN_IN:
    return Object.assign({}, state, {
      ...action.payload,
      isSignedIn: action.success,
      errorMessage: ''
    });
  case RENEW_TOKEN:
    return Object.assign({}, state, {
      auth_token: action.payload
    });
  case SIGN_OUT:
    return Object.assign({}, state, {
      ...initialState
    });
  default:
    return state;
  }
}
