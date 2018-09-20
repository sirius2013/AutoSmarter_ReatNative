import type { Action } from './types';

export const LOAD_KEYWORDS = 'LOAD_KEYWORDS';
export const UPDATE_KEYWORD = 'UPDATE_KEYWORD';
export const DELETE_KEYWORD = 'DELETE_KEYWORD';

export function loadKeywords(results: array) {
  return {
    type: LOAD_KEYWORDS,
    payload: results,
  }
}

export function setKeyword(result: object, index: integer) {
  return {
    type: UPDATE_KEYWORD,
    payload: result,
    index: index,
  }
}

export function removeKeyword(index: integer) {
  return {
    type: DELETE_KEYWORD,
    payload: index,
  }
}
