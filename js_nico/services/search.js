import Base from './base.js';
import { filterTypes } from '../reducers/filter';

export function filter(query: string){
  qstring = `?text=${query.replace(/ +/g, '+')}`;
  return fetch(`${Base.url}${Base.filter.path}${qstring}`, {
    method: Base.filter.method
  });
};

export function refilter(filters: hash){
  qstring = remapFilter(filters);
  console.log('refilter', qstring);
  return fetch(`${Base.url}${Base.refilter.path}?${qstring}`, {
    method: Base.refilter.method
  });
}

export function searchCar(filters: hash){
  qstring = remapFilter(filters);
  console.log('searchCar', qstring);
  return fetch(`${Base.url}${Base.search.path}?${qstring}`, {
    method: Base.search.method
  });
};

function remapFilter(filters){
  let qstring = [];

  filterTypes.map((obj, index) => {
    let key = `filters[${index}][key]=${obj}`;
    let value = '';

    switch(obj){
    case 'make':
    case 'title_search':
      if(filters[obj].value != null){
        value = `filters[${index}][value]=${filters[obj].value}`;
      }
      break;
    case 'price':
    case 'mileage':
    case 'year':
      if(filters[obj].max > filters[obj].min){
        value = `filters[${index}][min]=${filters[obj].min}&filters[${index}][max]=${filters[obj].max}`;
      }
      break;
    case 'tag':
      if(filters[obj].length > 0){
        key = '';
        value = (filters[obj] || []).map((val, idx) => {
          let date = new Date();
          let newKey = `filters[${date.getTime() + idx}][key]=${obj}`;
          let newVal = `filters[${date.getTime() + idx}][value]=${val.value}`;
          return `${newKey}&${newVal}`;
        }).join('&');
      }
      break;
    default:
      if(filters[obj].values.length > 0){
        value = (filters[obj].values || []).map((val, idx) => `filters[${index}][values][]=${val}`).join('&');
      }
      break;
    }

    if(value != ''){
      qstring.push(`${key}&${value}`);
    }
  });

  return qstring.join('&');
};
