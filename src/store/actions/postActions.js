import { createAction } from 'redux-actions';

export const FETCH_POSTS_REQUESTED = 'POST/FETCH_POSTS_REQUESTED';
export const FETCH_POSTS_RECEIVED = 'POST/FETCH_POSTS_RECEIVED';
export const FETCH_POSTS_REJECTED = 'POST/FETCH_POSTS_REJECTED';

export const USER_POSTS_REQUESTED = 'POST/USER_POSTS_REQUESTED';
export const USER_POSTS_RECEIVED = 'POST/USER_POSTS_RECEIVED';
export const USER_POSTS_REJECTED = 'POST/USER_POSTS_REJECTED';

export const SEND_POST_REQUESTED = 'POST/SEND_POST_REQUESTED';
export const SEND_POST_RECEIVED = 'POST/SEND_POST_RECEIVED';
export const SEND_POST_REJECTED = 'POST/SEND_POST_REJECTED';

export const fetchPosts = createAction(FETCH_POSTS_REQUESTED);
export const fetchedPostsSuccess = createAction(FETCH_POSTS_RECEIVED);
export const fetchedPostsFail = createAction(FETCH_POSTS_REJECTED);

export const currentPosts = createAction(USER_POSTS_REQUESTED);
export const currentPostsSuccess = createAction(USER_POSTS_RECEIVED);
export const currentPostsFail = createAction(USER_POSTS_REJECTED);

export const sendPost = createAction(SEND_POST_REQUESTED);
export const sendPostSuccess = createAction(SEND_POST_RECEIVED);
export const sendPostFail = createAction(SEND_POST_REJECTED);

