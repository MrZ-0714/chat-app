import { ChatActionTypes } from "./chat.action.types";

const INITIAL_STATE = {
  newMessage: null,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.SEND_NEW_MESSAGE:
      return {
        ...state,
        newMessage: action.payload,
      };
    //No state update when no action registered.
    default:
      return state;
  }
};

export default chatReducer;
