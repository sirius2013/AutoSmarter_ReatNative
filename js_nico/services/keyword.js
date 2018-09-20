import Base from './base';

export function fetchKeywords(email: string, token: string) {
  return fetch(`${Base.url}${Base.savedSearch.path}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    }
  });
}

export function saveKeyword(content: string, email: string, token: string) {
  return fetch(`${Base.url}${Base.savedSearch.path}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    },
    body: JSON.stringify({
      saved_search: { content: content }
    }),
  });
}

export function updateKeyword(keywordId: integer, sendNotification: boolean, email: string, token: string) {
  return fetch(`${Base.url}${Base.savedSearch.path}/${keywordId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    },
    body: JSON.stringify({
      saved_search: { send_notification: sendNotification }
    }),
  });
}

export function deleteKeyword(keywordId: integer, email: string, token: string) {
  return fetch(`${Base.url}${Base.savedSearch.path}/${keywordId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    },
  });
}
