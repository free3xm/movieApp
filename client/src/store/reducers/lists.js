import { FETCH_LIST_START, FETCH_LIST_SUCCESS } from "../actions/actionTypes";

const initialState = {
  list: [],
  loading: true
};

export default function getLists(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_START: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_LIST_SUCCESS: {
      console.log(action);
      return {
        ...state,
        list: action.list,
        loading: false
      };
    }
    default:
      return state;
  }
}
