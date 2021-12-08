import { all } from 'redux-saga/effects';
import {
  watcherUserLogin,
  watcherUserReg,
  watcherUserAuth,
  watcherUserLogOut,
  watcherGetUser,
  watcherUpdateUser,
  watcherGetUserData,
  watcherGetCurrentUserData,
} from './sagas/userSaga';
import {
  watcherRequestPosts,
  watcherRequestUserPosts,
  watcherRequestSendPost,
} from './sagas/postsSaga';

export default function* rootSaga() {
  yield all([
    watcherUserLogin(),
    watcherRequestPosts(),
    watcherRequestUserPosts(),
    watcherRequestSendPost(),
    watcherUserReg(),
    watcherUserLogOut(),
    watcherGetUser(),
    watcherUpdateUser(),
    watcherGetUserData(),
    watcherGetCurrentUserData(),
  ]);
}
