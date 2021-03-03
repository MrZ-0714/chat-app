import { ChatActionTypes } from "./chat.action.types";

export const sendNewMessageAction = (chat) => ({
  type: ChatActionTypes.SEND_NEW_MESSAGE,
  payload: chat,
});
