import {
  USER_REJECTED,
  USER_RECEIVED,
  USER_REQUESTED,
  USER_REGISTRATION,
  USER_AUTHENTICATE_REQUESTED,
  USER_LOGOUT_REQUESTED,
  USER_LOGOUT_REJECTED,
  USER_LOGOUT_RECEIVED,
  USER_AUTHENTICATE_RECEIVED,
  USER_GET_REQUESTED,
  USER_GET_RECEIVED,
  USER_GET_REJECTED,
  USER_UPDATE_REQUESTED,
  USER_UPDATE_RECEIVED,
  USER_UPDATE_REJECTED,
} from '../actions/userActions';

const initialState = {
  isFetching: false,
  error: null,
  userData: null,
  token: false,
  currentUser: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUESTED:
    case USER_REGISTRATION:
    case USER_GET_REQUESTED:
    case USER_UPDATE_REQUESTED:
      return { ...state, isFetching: true, error: null };

    case USER_RECEIVED:
    case USER_AUTHENTICATE_RECEIVED:
    case USER_UPDATE_RECEIVED:
      return {
        ...state, isFetching: false, userData: action.payload, error: null, token: true,
      };

    case USER_REJECTED:
    case USER_LOGOUT_REJECTED:
    case USER_GET_REJECTED:
    case USER_UPDATE_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        currentUser: null,
        token: false,
      };

    case USER_AUTHENTICATE_REQUESTED:
      return {
        ...state, isFetching: false, error: null,
      };

    case USER_LOGOUT_REQUESTED:
      return {
        ...state, isFetching: true, error: null,
      };

    case USER_LOGOUT_RECEIVED:
      return {
        ...state,
        isFetching: false,
        userData: null,
        currentUser: null,
        error: null,
        token: false,
      };

    case USER_GET_RECEIVED:
      return {
        ...state, isFetching: false, currentUser: action.payload, error: null,
      };

    default:
      return state;
  }
}
