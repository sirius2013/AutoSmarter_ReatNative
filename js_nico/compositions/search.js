import { filter, refilter, searchCar } from '../services/search';
import { fetchKeywords, saveKeyword, updateKeyword, deleteKeyword } from '../services/keyword';
import { renewToken } from '../actions/user';
import { setFilter, gotResults, fetchFilter } from '../actions/search';
import { loadKeywords, setKeyword, removeKeyword } from '../actions/keyword';
import { filterTypes } from '../reducers/filter';

export function doFilter(keyword: string) {
  return (dispatch) => {
    filter(keyword)
      .then(
        response => response.json(),
        error => error
      )
      .then((json) => {
        dispatch(fetchFilter());
        dispatch(setFilter(json, true));
      });
  };
}

export function reFilter(filters: object) {
  return (dispatch) => {
    refilter(filters)
      .then(
        response => response.json(),
        error => error,
      )
      .then((json) => {
        dispatch(setFilter(json, false));
      });
  };
}

export function doSearch(filters: object) {
  return (dispatch) => {
    searchCar(filters)
      .then(
        response => response.json(),
        error => error,
      )
      .then((json) => {
        // TODO: pagination
        dispatch(gotResults(json.cars, true));
      });
  };
}

export function getKeywords(email: string, token: string) {
  return (dispatch) => {
    fetchKeywords(email, token)
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
        dispatch(loadKeywords(json.saved_searchs));
      });
  };
}

export function saveFilter(filters: object, email: string, token: string) {
  return (dispatch) => {
    const query = toQuery(filters);
    saveKeyword(query, email, token)
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch(renewToken(response.headers.map['x-user-token'][0]));
          }
          return response.json();
        },
        error => error,
      );
  };
}

export function updateFilter(index: integer, keywordId: integer, sendNotification: boolean, email: string, token: string) {
  return (dispatch) => {
    updateKeyword(keywordId, sendNotification, email, token)
      .then(
        (response) => {
          if (response.status == 200) {
            dispatch(renewToken(response.headers.map['x-user-token'][0]));
          }
          return response.json();
        },
        error => error,
      )
      .then((json) => {
        dispatch(setKeyword(json.saved_search, index));
      });
  };
}

export function removeFilter(index: integer, keywordId: integer, email: string, token: string) {
  return (dispatch) => {
    deleteKeyword(keywordId, email, token)
      .then(
        (response) => {
          if (response.status == 200) {
            dispatch(renewToken(response.headers.map['x-user-token'][0]));
          }
          return response.json();
        },
        error => error,
      )
      .then((json) => {
        if (json.success == true) {
          dispatch(removeKeyword(index))
        }
      });
  }
}

function toQuery(filters) {
  console.log('toQuery');
  let query = filterTypes.reduce((q, obj) => {
    switch(obj) {
    case 'make':
      if (filters[obj].value !== null) {
        let value = findFromOptions(filters[obj].options, filters[obj].value);
        q.push(value.replace(/ +/g, '+'));
      }
      break;
    case 'color_ex':
    case 'model':
      filters[obj].values.reduce((retVal, value) => {
        q.push(findFromOptions(filters[obj].options, value));
        return retVal;
      }, []);
      break;
    case 'price':
      if (filters[obj].min !== null && filters[obj].max !== null) {
        q.push(`${Number(filters[obj].min).toLocaleString()}$-${Number(filters[obj].max).toLocaleString()}$`);
      }
      break;
    case 'year':
      if (filters[obj].min !== null && filters[obj].max !== null) {
        q.push(`${filters[obj].min}-${filters[obj].max}`);
      }
      break;
    case 'mileage':
      if (filters[obj].min !== null && filters[obj].max !== null) {
        q.push(`${Number(filters[obj].min).toLocaleString()}km-${Number(filters[obj].max).toLocaleString()}km`);
      }
      break;
    case 'title_search':
      if (filters[obj].value !== null) {
        q.push(filters[obj].value.replace(/ +/g, '+'));
      }
      break;
    case 'tag':
      filters[obj].forEach(tag => q.push(tag.title));
      break;
    }

    return q;
  },[]);
  return query.join('+');
}

function findFromOptions(options, value) {
  return options.reduce((val, obj) => obj.value === value ? obj.name : val, '');
}
