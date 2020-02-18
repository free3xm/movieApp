import { combineReducers } from "redux";
import lists from "./lists";
import movieData from "./movie";
import auth from "./auth";

export default combineReducers({
  lists,
  movieData,
  auth
});
