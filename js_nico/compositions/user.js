import { renewToken, myCarsLoaded, setUser } from '../actions/user';
import { myCars } from '../services/cars';
import { updateUser } from '../services/authentication';

export function doUpdateUser(params: hash, email: string, token: string) {
  return (dispatch) => {
    updateUser(params, email, token)
      .then(
        (response) => {
          if (response.status !== 401) {
            dispatch(renewToken(response.headers.map['x-user-token'][0]));
          }
          return response.json();
        }
      )
      .then((json) => {
        if(json.success === true) {
          delete params.password;
          dispatch(setUser(params));
        }
      });
  };
}

export function loadMyCars(email: string, token: string) {
  return (dispatch) => {
    myCars(email, token)
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch(renewToken(response.headers.map['x-user-token'][0]));
          }
          return response.json();
        },
        error => error,
      )
      .then((json) => {
        // TODO: handle error, no connection
        dispatch(myCarsLoaded(json.cars));
      });
  };
}
