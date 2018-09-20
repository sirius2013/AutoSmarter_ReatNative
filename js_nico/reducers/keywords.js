import { REHYDRATE } from 'redux-persist/constants';
import update from 'immutability-helper';
import type { Action } from '../actions/types';
import { LOAD_KEYWORDS, UPDATE_KEYWORD, DELETE_KEYWORD } from '../actions/keyword';

const initialState = {
  results: [],
  loaded: false,
};

export type State = {
  ...initialState
};


export default function(state: State = initialState, action: Action): State {
  switch(action.type){
  case REHYDRATE:
    const savedData = action.payload.keywords || initialState;
    return Object.assign({}, state, {
      ...savedData,
      loaded: true,
    });
  case LOAD_KEYWORDS:
    console.log(action.payload);
    return Object.assign({}, state, {
      results: action.payload,
      loaded: true,
    });
  case UPDATE_KEYWORD:
    return update(state, {
      results: {
        [action.index]: { $set: action.payload }
      }
    });
  case DELETE_KEYWORD:
    return update(state, {
      results: {
        $splice: [[action.payload, 1]]
      }
    });
  default:
    return state;
  }
}
