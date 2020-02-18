import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_START,
  AUTH_LOGOUT,
  AUTH_LOGIN_ERROR,
  CLEAR_ERROR
} from "../actions/actionTypes";

const initialState = {
  userName: null,
  token: null,
  loading: false,
  isLogin: false,
  err: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userName: action.data.login,
        token: action.data.token,
        isLogin: true
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        isLogin: false,
        userName: null
      };

    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        err: action.err
      };
    case CLEAR_ERROR:
      return {
        ...state,
        err: null
      };

    default:
      return state;
  }
}
