import axios from "../../axios/axios";
import { FETCH_LIST_START, FETCH_LIST_SUCCESS } from "./actionTypes";

export function fetchLists() {
  return async dispatch => {
    dispatch(fetchListStart());
    try {
      const res = await axios.get("/api/lists/now_playing");
      const data = res.data;
      dispatch(fetchListSuccess(data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchListSuccess(list) {
  return {
    type: FETCH_LIST_SUCCESS,
    list
  };
}

export function fetchListStart() {
  return {
    type: FETCH_LIST_START
  };
}
