import type { Action } from './types';

export const SET_USER = 'SET_USER';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const RENEW_TOKEN = 'RENEW_TOKEN';
export const UPDATE_USER = 'UPDATE_USER';

export const MY_CARS_LOADED = 'MY_CARS_LOADED';
export const MY_CAR_UPDATED = 'MY_CAR_UPDATED';
export const MY_CAR_ADDED = 'MY_CAR_ADDED';

export function myCarsLoaded(results: array):Action {
  return {
    type: MY_CARS_LOADED,
    payload: results,
  };
}

export function myCarUpdated(car: object, index: integer):Action {
  return {
    type: MY_CAR_UPDATED,
    payload: car,
    index: index,
  };
}

export function myCarAdded(car: object):Action {
  return {
    type: MY_CAR_ADDED,
    payload: car,
  };
}

export function setUser(user: hash):Action {
  return {
    type: SET_USER,
    payload: user
  };
}

export function logIn(user: hash, success: boolean):Action {
  return {
    type: SIGN_IN,
    payload: user,
    success: success
  };
}

export function signOut(success: boolean, errorMessage: string):Action {
  return {
    type: SIGN_OUT,
    success: success,
    errorMessage: errorMessage
  };
}

export function renewToken(token: string){
  return {
    type: RENEW_TOKEN,
    payload: token
  };
}
