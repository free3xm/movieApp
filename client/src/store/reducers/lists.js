import { FETCH_LIST_START, FETCH_LIST_SUCCESS } from "../actions/actionTypes";

const initialState = {
  lists: {
    now_playing: [],
    upcoming: [],
    popular: [],
    top_rated: []
  },
  loading: true
};

export default function getLists(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_START: {
      console.log(action.listName, state);
      return {
        ...state,
        loading: state.lists[action.listName].length ? false : true
      };
    }
    case FETCH_LIST_SUCCESS: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listName]: [
            ...state.lists[action.listName],
            ...action.list[action.listName]
          ]
        },
        loading: false
      };
    }
    default:
      return state;
  }
}
