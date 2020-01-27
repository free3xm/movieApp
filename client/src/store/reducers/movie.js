import { FETCH_MOVIE_SUCCESS, FETCH_MOVIE_START } from "../actions/actionTypes";

const intialState = {
  movie: null,
  loading: true
};

export default function getMovie(state = intialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.movie,
        loading: false
      };
    default:
      return state;
  }
}
