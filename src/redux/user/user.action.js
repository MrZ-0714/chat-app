import { UserActionTypes } from "./user.action.types";

export const setCurrentUserAction = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signoutCurrentUserAction = () => ({
  type: UserActionTypes.SIGN_OUT_CURRENT_USER,
  payload: null,
});