/* eslint-disable no-param-reassign */
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  fetchedPostsFail,
  currentPostsSuccess,
  currentPostsFail,
  sendPostSuccess,
  sendPostFail,
  FETCH_POSTS_REQUESTED,
  fetchedPostsSuccess,
  USER_POSTS_REQUESTED,
  SEND_POST_REQUESTED,
} from '../actions/postActions';

import { setItemSS, setItemAS, removeItemAS, getItemSS, getItemAS } from '../utilities';

import Api from '../../api';

export function fetchPosts(payload) {
  return axios.get(`https://news-feed.dunice-testing.com/api/v1/news?page=${payload}&perPage=7`);
}

function fetchUserPosts(payload) {
  return axios ({
    method: 'get',
    url: `https://news-feed.dunice-testing.com/api/v1/news/user/${payload.id}/?page=${payload.page}&perPage=5`,
    headers: { 'Authorization': payload.token },
  });
}

function sendImage(payload) {
  const bodyFormData = new FormData();
  bodyFormData.append("file", {
    name: 'file.jpg',
    uri: payload.image,
    type: 'image/jpeg',
  });

  return axios({
    method: 'POST',
    url: 'https://news-feed.dunice-testing.com/api/v1/file/uploadFile',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': payload.token },
  });
}

function sendPost(payload) {
  return axios ({
    method: 'post',
    url: 'https://news-feed.dunice-testing.com/api/v1/news',
    data: payload.post,
    headers: { 'Authorization': payload.token },
  });
}

function* workerRequestPosts(action) {
  try {
    const response = yield call(fetchPosts, action.payload);
    const payload = response.data.data;
    yield put(fetchedPostsSuccess({ data: payload, page: action.payload }));
  } catch (error) {
    yield put(fetchedPostsFail(error.response.data.statusCode));
  }
}

function* workerRequestUserPosts(action) {
  try {
    const userToken = yield getItemSS();
    const response = yield call(fetchUserPosts, {id:action.payload.userId, page: action.payload.offset, token: userToken});
    const payload = response.data.data;
    yield put(currentPostsSuccess({ data: payload, page: action.payload.offset}));
  } catch (error) {
    yield put(currentPostsFail(error.response.data.statusCode));
  }
}

function* workerRequestSendPost(action) {
  try {  
    const userToken = yield getItemSS();
    const responseImage = yield call(sendImage, {image: action.payload.image, token: userToken});
    const image = responseImage.data.data;
    action.payload.image = image;
    
    yield call(sendPost, {post:action.payload, token:userToken});
    yield put(sendPostSuccess(action.payload));
  } catch (error) {
    yield put(sendPostFail(error.response.data.statusCode));
  }
}

export function* watcherRequestPosts() {
  yield takeEvery(FETCH_POSTS_REQUESTED, workerRequestPosts);
}

export function* watcherRequestUserPosts() {
  yield takeEvery(USER_POSTS_REQUESTED, workerRequestUserPosts);
}

export function* watcherRequestSendPost() {
  yield takeEvery(SEND_POST_REQUESTED, workerRequestSendPost);
}
