import { combineReducers } from 'redux';
import postsReducer from './reducers/postsReducer';
import userReducer from './reducers/usersReducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
});
