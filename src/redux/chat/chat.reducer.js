import { ChatActionTypes } from "./chat.action.types";
import { addNewChatMessages } from "./chat.utils";

import chatMessagesData from "./zdata.chat.mock-data";

const INITIAL_STATE = {
  newMessage: null,
  chatMessages: chatMessagesData,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.SEND_NEW_MESSAGE:
      return {
        ...state,
        chatMessages: addNewChatMessages(state.chatMessages, action.payload),
      };
    //No state update when no action registered.
    default:
      return state;
  }
};

export default chatReducer;
