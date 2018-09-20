import type { Action } from './types';

export const SET_FILTER = 'SET_FILTER';
export const FETCH_FILTER = 'FETCH_FILTER';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const GOT_RESULTS = 'GOT_RESULTS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export function setFilter(filterHash: hash, fromSaved: boolean):Action {
  return {
    type: SET_FILTER,
    payload: filterHash,
    useSaved: fromSaved,
    isFetching:false,
  };
}
export function fetchFilter():Action {
  return {
    type: FETCH_FILTER,
  };
}

export function changeFilter(filterHash: hash, key: string, current_state: has):Action {
  return {
    type: CHANGE_FILTER,
    payload: filterHash,
    key: key,
  };
}

export function gotResults(results: array, eop: boolean){
  return {
    type: GOT_RESULTS,
    payload: { results: results, eop: eop },
  };
}

export function clearResults(){
  return {
    type: CLEAR_RESULTS,
  };
}
