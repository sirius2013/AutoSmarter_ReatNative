import { REHYDRATE } from 'redux-persist/constants';
import type { Action } from "../actions/types";
import { SET_FILTER, CHANGE_FILTER, FETCH_FILTER } from '../actions/search';

export const filterTypes = [
  'make', 'color_ex', 'model',
  'price', 'year', 'mileage',
  'title_search', 'location',
  'tag'
];

const filterDefaultState = {
  values: [],
  min: null,
  max: null,
  value: null,
  options: [],
  title: null,
  rehydrate: false,
  useSaved: false,
  count:0,
  isFetching:false,
};

const initialState = filterTypes.reduce((map, obj) => {
  if(obj == 'tags') {
    map[obj] = [{ ...filterDefaultState }];
  }else{
    map[obj] = { ...filterDefaultState };
  }
  return map;
}, {});

export type State = {
  ...initialState
};

export default function(state: State = initialState, action: Action): State {
  switch(action.type){
  case REHYDRATE:
    const savedData = action.payload.filter || initialState;
    const rehydrate = JSON.stringify(savedData) !== JSON.stringify(initialState);
    return Object.assign({}, state, {
      ...savedData,
      rehydrate: rehydrate,
    });
  case FETCH_FILTER:
    newState = Object.assign({},state,{
      ...state,
      isFetching:true
    });
    return newState;
  case CHANGE_FILTER:
    newState = Object.assign({}, state, {
      [action.key]: {
        ...state[action.key],
        ...action.payload,
      },
    });

    if (action.key == 'make') {
      newState = Object.assign({}, state, {
        ...initialState,
        [action.key]: {
          ...state[action.key],
          ...action.payload,
        },
      });
    }
    return newState;
  case SET_FILTER:
    let hasTag = false;
    let newState = action.payload.filters.reduce((map, obj) => {
      let newObject = {
        values: obj.values || [],
        min: obj.min,
        max: obj.max,
        value: obj.value,
        options: obj.options,
        title: obj.title,
        useSaved: action.useSaved,
        count:action.payload.count,
        isFetching:false,
      };

      if(obj.key == 'tag'){
        hasTag = true;
        if(map[obj.key] == undefined){
          map[obj.key] = [newObject];
        }else{
          map[obj.key].push(newObject);
        }
      }else{
        map[obj.key] = newObject;
      }

      return map;
    }, {});

    if(hasTag == false){
      newState = Object.assign({}, newState, { tag: [] });
    }

    return Object.assign({}, state, {
      ...newState,
    });
  default:
    return state;
  }
}
