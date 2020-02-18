import { FETCH_MOVIE_START, FETCH_MOVIE_SUCCESS } from "./actionTypes";
import axios from "../../axios/axios";

export function fetchMovie(id) {
  return async dispatch => {
    dispatch(fetchMovieStart());
    try {
      const res = await axios.get(`/api/movies/get_movie/${id}`);
      const data = res.data;
      dispatch(fetchMovieSuccess(data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchMovieStart() {
  return {
    type: FETCH_MOVIE_START
  };
}
export function fetchMovieSuccess(movie) {
  return {
    type: FETCH_MOVIE_SUCCESS,
    movie
  };
}
