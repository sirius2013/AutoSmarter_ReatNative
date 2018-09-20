import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import filter from './filter';
import searchResult from './search_result';
import keywords from './keywords';
import cars from './cars';

export default combineReducers({
  form: formReducer,
  drawer,
  user,
  filter,
  keywords,
  searchResult,
  cars,
});
