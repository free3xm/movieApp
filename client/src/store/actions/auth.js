import axios from "../../axios/axios";
import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGIN_ERROR,
  CLEAR_ERROR
} from "./actionTypes";

const userData = "userData";

export default function login(user, type) {
  return async dispatch => {
    try {
      dispatch(authStart());
      const res = await axios.post(`/api/auth/${type}`, user);
      const data = res.data;
      if (res.status !== 200 || res.status !== 201)
        throw new Error("Bad request");
      localStorage.setItem(userData, JSON.stringify({ token: data.token }));
      dispatch(authSuccess(data));
      console.log(res);
    } catch (e) {
      dispatch(authError(e.message));
    }
  };
}

export function autoLogin() {
  return async dispatch => {
    try {
      const user = JSON.parse(localStorage.getItem(userData));
      if (user && user.token) {
        dispatch(authStart());
        const res = await axios.get("/api/auth/autologin", {
          headers: { Authorization: `bearer ${user.token}` }
        });
        const data = res.data;
        dispatch(authSuccess(data));
      }
    } catch (e) {
      dispatch(authError(e.message));
    }
  };
}
export function logout() {
  localStorage.removeItem(userData);
  return {
    type: AUTH_LOGOUT
  };
}

function authStart() {
  return {
    type: AUTH_LOGIN_START
  };
}

function authSuccess(data) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    data
  };
}

function authError(err) {
  return {
    type: AUTH_LOGIN_ERROR,
    err
  };
}

export function clearErr(){
  return {
    type: CLEAR_ERROR
  };
}