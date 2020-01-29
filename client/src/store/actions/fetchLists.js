import axios from "../../axios/axios";
import { FETCH_LIST_START, FETCH_LIST_SUCCESS } from "./actionTypes";

export function fetchLists(listName, page = 0) {
  return async dispatch => {
    dispatch(fetchListStart(listName));
    try {
      const res = await axios.get(`/api/lists/${listName}/${page}`);
      const data = res.data;
      console.log(data);
      dispatch(fetchListSuccess(listName, data));
    } catch (e) {
      console.log(e);
    }
  };
}
export function fetchListStart(listName) {
  return {
    type: FETCH_LIST_START,
    listName
  };
}

export function fetchListSuccess(listName, list) {
  console.log(list)
  return {
    type: FETCH_LIST_SUCCESS,
    list,
    listName
  };
}
