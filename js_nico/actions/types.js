
export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: string }
  | { type: 'REPLACE_ROUTE', route: string }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
  | { type: 'OPEN_DRAWER'}
  | { type: 'CLOSE_DRAWER'}
  | { type: 'SET_USER', name: string}
  | { type: 'SET_LIST', list: string}
  | { type: 'SIGN_IN', user: hash, success: boolean, errorMessage: string }
  | { type: 'RENEW_TOKEN', token: string }
  | { type: 'SIGN_OUT', success: boolean, errorMessage: string }
  | { type: 'SET_FILTER', filter: hash }
  | { type: 'CHANGE_FILTER', filter: hash, key: string }
  | { type: 'GOT_RESULTS', results: array, eol: boolean }
  | { type: 'CLEAR_RESULTS' }
  | { type: 'LOAD_KEYWORDS', results: array }
  | { type: 'UPDATE_KEYWORD', result: object, index: integer }
  | { type: 'DELETE_KEYWORD', index: integer }
  | { type: 'MY_CARS_LOADED', results: array }
  | { type: 'MY_CAR_UPDATED', car: object, index: integer }
  | { type: 'MY_CAR_ADDED', car: object }

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
