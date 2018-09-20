import { REHYDRATE } from 'redux-persist/constants';
import update from 'immutability-helper';
import type { Action } from '../actions/types';
import { MY_CARS_LOADED, MY_CAR_UPDATED, MY_CAR_ADDED } from '../actions/user';

const initialState = {
  mine: [],
};

export type State = {
  ...initialState,
};

export default function (state:State = initialState, action:Action): State {
  switch(action.type){
  case REHYDRATE:
    const savedData = action.payload.cars || initialState;
    return Object.assign({}, state, {
      ...savedData
    });
  case MY_CARS_LOADED:
    return Object.assign({}, state, {
      mine: action.payload,
    });
  case MY_CAR_UPDATED:
    return update(state, {
      mine: {
        [action.index]: { $set: action.payload }
      }
    });
  case MY_CAR_ADDED:
    return update(state, {
      mine: {
        $set: [action.payload].concat(state.mine)
      }
    });
  default:
    return state;
  }
}
