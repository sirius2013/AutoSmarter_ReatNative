import type { Action } from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants';
import { GOT_RESULTS, CLEAR_RESULTS } from '../actions/search';

const defaultState = {
  results: [],
  eop: false // END OF PAGE for pagination
};

export type State = {
  ...defaultState
};

export default function(state: State = defaultState, action: Action): State {
  switch(action.type){
  case REHYDRATE:
    const savedData = action.payload.searchResult || defaultState;
    return Object.assign({}, state, {
      ...savedData,
    });
  case GOT_RESULTS:
    return Object.assign({}, state, {
      ...action.payload,
    });
  case CLEAR_RESULTS:
    return Object.assign({}, state, {
      ...defaultState,
    });
  default:
    return state;
  }
}
