import Base from './base';

export function myCars(email: string, token: string) {
  return fetch(`${Base.url}${Base.myCars.path}.json`, {
    method: Base.myCars.method,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email
    },
  });
}

export function getFeatures(token: string){
  return fetch(`${Base.url}${Base.getFeatures.path}.json`, {
    method: Base.getFeatures.method,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
    }
  });
}

export function createCar(params: hash, token: string, email: string){
  const data = prepareData(params);

  return fetch(`${Base.url}${Base.createCar.path}.json`, {
    method: Base.createCar.method,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    },
    body: JSON.stringify(data)
  });
}

export function updateCar(params: hash, token: string, email: string) {
  const data = prepareData(params);
  console.log('prepareData', data);

  return fetch(`${Base.url}${Base.updateCar.path}${params.id}.json`, {
    method: Base.updateCar.method,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': token,
      'X-User-Email': email,
    },
    body: JSON.stringify(data)
  });
}

function prepareData(params: hash) {
  return {
    car: {
      images: params.base64Images,
      title: params.title,
      make_id: params.makeId,
      model_id: params.modelId,
      color_ex_id: params.colorId,
      color_in_id: params.interiorId,
      body_style_id: params.bodyStyleId,
      transmission_id: params.transmissionId,
      drive_train_id: params.driveTrainId,

      speeds: params.speeds,
      mileage: params.mileage,
      price: params.price,
      year: params.yearId,
      title: params.title,
      doors: params.doors,
      passengers: params.passengers
    }
  };
}
