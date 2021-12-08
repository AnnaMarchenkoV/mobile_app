/* eslint-disable no-param-reassign */
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  setItemSS,
  setItemAS,
  removeItemAS,
  getItemSS,
  getItemAS,
} from "../utilities";
import {
  loginSuccess,
  loginFail,
  logOutFail,
  logOutSuccess,
  userAuthenticateSuccess,
  getUserSuccess,
  getUserFail,
  updateUserFail,
  updateUserSuccess,
  USER_REQUESTED,
  USER_REGISTRATION,
  USER_AUTHENTICATE_REQUESTED,
  USER_LOGOUT_REQUESTED,
  USER_GET_REQUESTED,
  USER_UPDATE_REQUESTED,
  USER_DATA_REQUESTED,
  CURRENT_USER_DATA_REQUESTED,
} from "../actions/userActions";

function userLogin(payload) {
  return axios.post(
    "https://news-feed.dunice-testing.com/api/v1/auth/login",
    payload
  );
}

function updateUserAvatar(payload) {
  const bodyFormData = new FormData();
  bodyFormData.append("file", {
    name: 'file.jpg',
    uri: payload.user.user.avatar.uri,
    type: 'image/jpeg',
  });

  return axios({
    method: "POST",
    url: "https://news-feed.dunice-testing.com/api/v1/file/uploadFile",
    data: bodyFormData,
    headers: {
      Authorization: payload.token,
      "Content-Type": "multipart/form-data",
    },
  });
}

function userRegistration(payload) {
  return axios.post(
    "https://news-feed.dunice-testing.com/api/v1/auth/register",
    payload
  );
}

function updateUserInfo(payload) {
  return axios({
    method: "put",
    url: "https://news-feed.dunice-testing.com/api/v1/user",
    data: payload.user.user,
    headers: { Authorization: payload.token },
  });
}


function getCurrentUserInfo(payload) {
  return axios({
    method: "GET",
    url: `https://news-feed.dunice-testing.com/api/v1/user/${payload.id}`,
    headers: { Authorization: payload.token },
  });
}

function* workerUserLogin(action) {
  try {
    const response = yield call(userLogin, action.payload);
    const userData = response.data.data;
    yield setItemSS("token", userData.token);
    yield setItemAS('userData', userData);
    yield put(loginSuccess(userData));
  } catch (error) {
    yield removeItemAS('userData');
    yield put(loginFail(error.response.data.statusCode));
  }
}

function* workerUserLogOut() {
  try {
    yield put(logOutSuccess());
  } catch (error) {
    yield put(logOutFail(error));
  } finally {
    yield removeItemAS('userData');
  }
}

function* workerRegistration(action) {
  try {
    const responseAvatar = yield call(updateUserAvatar, {user: action.payload});
    action.payload.user.avatar = responseAvatar.data.data;
    const response = yield call(userRegistration, action.payload.user);
    const userData = response.data.data;
    yield setItemAS('userData', userData);
    yield setItemSS("token", userData.token);
    yield put(loginSuccess(userData));
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* workerUpdateUser(action) {
  try {
    const token = yield getItemSS();
    if (action.payload.user.avatar.filename) {
    const responseAvatar = yield call(updateUserAvatar, {
      user: action.payload,
      token: token,
    });
    const avatar = responseAvatar.data.data;
    action.payload.user.avatar = avatar;
    }
    const response = yield call(updateUserInfo, {
      user: action.payload,
      token: token,
    });
    const userData = response.data.data;
    yield removeItemAS('userData');
    yield setItemAS('userData', userData);
    yield put(updateUserSuccess(userData));
  } catch (error) {
    yield put(updateUserFail(error.response.data.statusCode));
  }
}

function* workerGetUserData(action) {
  try {
    const userData = yield getItemAS(action.payload);
    yield put(loginSuccess(userData));
  } catch (error) {
    yield put(updateUserFail(error.response.data.statusCode));
  }
}

function* workerGetCurrentUserData(action) {
  try {
    yield getItemAS(action.payload);
    yield put(getUserSuccess(action.payload));
  } catch (error) {
    yield put(getUserFail(error.response.data.statusCode));
  }
}

function* workerGetUser(action) {
  try {
    const token = yield getItemSS();
    const response = yield call(getCurrentUserInfo, {id: action.payload, token: token});
    const userData = response.data.data;
    yield setItemAS('currentUser', userData);
    yield put(getUserSuccess(userData));
  } catch (error) {
    yield put(getUserFail(error));
  }
}

export function* watcherUserLogin() {
  yield takeLatest(USER_REQUESTED, workerUserLogin);
}

export function* watcherUserLogOut() {
  yield takeLatest(USER_LOGOUT_REQUESTED, workerUserLogOut);
}

export function* watcherUserReg() {
  yield takeLatest(USER_REGISTRATION, workerRegistration);
}

export function* watcherUpdateUser() {
  yield takeLatest(USER_UPDATE_REQUESTED, workerUpdateUser);
}

export function* watcherGetUserData() {
  yield takeLatest(USER_DATA_REQUESTED, workerGetUserData);
}

export function* watcherGetCurrentUserData() {
  yield takeLatest(CURRENT_USER_DATA_REQUESTED, workerGetCurrentUserData);
}

export function* watcherGetUser() {
  yield takeLatest(USER_GET_REQUESTED, workerGetUser);
}
