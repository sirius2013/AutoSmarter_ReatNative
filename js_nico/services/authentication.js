import Base from './base.js';

export function updateUser(params: hash, email: string, token: string) {
  console.log({user: params});
  return fetch(`${Base.url}${Base.updateUser.path}`, {
    method: Base.updateUser.method,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    },
    body: JSON.stringify({user: params}),
  });
}

export function signingIn(user: hash){
  return fetch(`${Base.url}${Base.signIn.path}`, {
    method: Base.signIn.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  });
}

export function registering(user: hash){
  return fetch(`${Base.url}${Base.register.path}`, {
    method: Base.register.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  });
}

export function signingOut(token: string, email: string){
  return fetch(`${Base.url}${Base.signOut.path}`, {
    method: Base.signOut.method,
    headers: {
      'X-User-Token': token,
      'X-User-Email': email
    }
  });
}
