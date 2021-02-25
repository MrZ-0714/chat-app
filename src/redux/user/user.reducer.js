import { UserActionTypes } from "./user.action.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SIGN_OUT_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    //No state update when no action registered.
    default:
      return state;
  }
};

export default userReducer;
