import { combineReducers } from "redux";
import lists from "./lists";
import movieData from "./movie";

export default combineReducers({
  lists,
  movieData
});
