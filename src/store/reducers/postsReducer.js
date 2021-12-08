import {
  FETCH_POSTS_RECEIVED,
  FETCH_POSTS_REJECTED,
  FETCH_POSTS_REQUESTED,
  USER_POSTS_REQUESTED,
  USER_POSTS_RECEIVED,
  USER_POSTS_REJECTED,
  SEND_POST_REQUESTED,
  SEND_POST_RECEIVED,
  SEND_POST_REJECTED,
} from '../actions/postActions';

const initialState = {
  items: [],
  isFetching: false,
  error: null,
  userItems: [],
  numberOfElements: 0,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUESTED:
    case USER_POSTS_REQUESTED:
    case SEND_POST_REQUESTED:
      return { ...state, isFetching: true, error: null};

    case FETCH_POSTS_RECEIVED:
      return {
        ...state,
        items: action.payload.page === 1
          ? action.payload.data.content : [...state.items, ...action.payload.data.content],
        numberOfElements: action.payload.data.numberOfElements,
        isFetching: false,
      };

    case FETCH_POSTS_REJECTED:
    case USER_POSTS_REJECTED:
    case SEND_POST_REJECTED:
      return {
        ...state, error: action.payload, isFetching: false,
      };

    case USER_POSTS_RECEIVED: {
      return {
        ...state,
        userItems: action.payload.page === 1
          ? action.payload.data.content : [...state.userItems, ...action.payload.data.content],
        numberOfElements: action.payload.data.numberOfElements,
        error: null,
        isFetching: false,
      };
    }

    case SEND_POST_RECEIVED:
      return {
        ...state, userItems: [action.payload, ...state.userItems], isFetching: false, error: null,
      };

    default: return state;
  }
}
