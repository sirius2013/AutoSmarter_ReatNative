export default Base = {
  url: 'http://104.236.150.86/',

  // AUTHENTICATION
  register: { path: '/users', method: 'POST' },
  signIn: { path: '/users/sign_in', method: 'POST' },
  signOut: { path: '/users/sign_out', method: 'DELETE' },
  updateUser: { path: '/users', method: 'PUT' },

  // SEARCH
  filter: { path: '/search/textQuery', method: 'GET' },
  refilter: { path: '/search/filtersQuery', method: 'GET' },
  search: { path: '/search/cars', method: 'GET'},

  // CREATE CARS
  getFeatures: { path: '/cars/features', method: 'GET' },
  createCar: { path: '/cars', method: 'POST' },
  updateCar: { path: '/cars/', method: 'PUT' },

  // SAVE SEARCH
  // get /saved_searches for get all
  // patch /saved_searches/:id for update
  // delete /saved_searches/:id for destroy
  // post /saved_searches for saving
  savedSearch: { path: 'saved_searches', method: 'GET' },

  // MY CARS
  myCars: { path: '/my_cars', method: 'GET' },
};
