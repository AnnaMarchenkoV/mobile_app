import { createAction } from 'redux-actions';

export const USER_REQUESTED = 'USER/REQUESTED';
export const USER_RECEIVED = 'USER/RECEIVED';
export const USER_REJECTED = 'USER/REJECTED';

export const USER_REGISTRATION = 'USER/REGISTRATION';

export const USER_AUTHENTICATE_REQUESTED = 'USER/AUTHENTICATE_REQUESTED';
export const USER_AUTHENTICATE_RECEIVED = 'USER/AUTHENTICATE_RECEIVED';
export const USER_AUTHENTICATE_REJECTED = 'USER/AUTHENTICATE_REJECTED';

export const USER_LOGOUT_REQUESTED = 'USER/LOGOUT_REQUESTED';
export const USER_LOGOUT_RECEIVED = 'USER/LOGOUT_RECEIVED';
export const USER_LOGOUT_REJECTED = 'USER/LOGOUT_REJECTED';

export const USER_GET_REQUESTED = 'USER/GET_REQUESTED';
export const USER_GET_RECEIVED = 'USER/GET_RECEIVED';
export const USER_GET_REJECTED = 'USER/GET_REJECTED';

export const USER_UPDATE_REQUESTED = 'USER/USER_UPDATE_REQUESTED';
export const USER_UPDATE_RECEIVED = 'USER/USER_UPDATE_RECEIVED';
export const USER_UPDATE_REJECTED = 'USER/USER_UPDATE_REJECTED';

export const USER_DATA_REQUESTED = 'USER/USER_DATA_REQUESTED';
export const USER_DATA_RECEIVED = 'USER/USER_DATA_RECEIVED';
export const USER_DATA_REJECTED = 'USER/USER_DATA_REJECTED';

export const CURRENT_USER_DATA_REQUESTED = 'USER/CURRENT_USER_DATA_REQUESTED';
export const CURRENT_USER_DATA_RECEIVED = 'USER/CURRENT_USER_DATA_RECEIVED';
export const CURRENT_USER_DATA_REJECTED = 'USER/CURRENT_USER_DATA_REJECTED';

export const userLogin = createAction(USER_REQUESTED);
export const loginSuccess = createAction(USER_RECEIVED);
export const loginFail = createAction(USER_REJECTED);

export const userRegistrationRequest = createAction(USER_REGISTRATION);

export const userAuthenticate = createAction(USER_AUTHENTICATE_REQUESTED);
export const userAuthenticateSuccess = createAction(USER_AUTHENTICATE_RECEIVED);
export const userAuthenticateFail = createAction(USER_AUTHENTICATE_REJECTED);

export const userLogOut = createAction(USER_LOGOUT_REQUESTED);
export const logOutSuccess = createAction(USER_LOGOUT_RECEIVED);
export const logOutFail = createAction(USER_LOGOUT_REJECTED);

export const getUser = createAction(USER_GET_REQUESTED);
export const getUserSuccess = createAction(USER_GET_RECEIVED);
export const getUserFail = createAction(USER_GET_REJECTED);

export const updateUser = createAction(USER_UPDATE_REQUESTED);
export const updateUserSuccess = createAction(USER_UPDATE_RECEIVED);
export const updateUserFail = createAction(USER_UPDATE_REJECTED);

export const getUserData = createAction(USER_DATA_REQUESTED);
export const getUserDataSuccess = createAction(USER_DATA_RECEIVED);
export const getUserDataFail = createAction(USER_DATA_REJECTED);

export const getCurrentUserData = createAction(CURRENT_USER_DATA_REQUESTED);
export const getCurrentUserDataSuccess = createAction(CURRENT_USER_DATA_RECEIVED);
export const getCurrentUserDataFail = createAction(CURRENT_USER_DATA_REJECTED);
