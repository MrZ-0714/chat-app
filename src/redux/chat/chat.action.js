import { ChatActionTypes } from "./chat.action.types";

export const sendNewMessage = (chat) => ({
  type: ChatActionTypes.SEND_NEW_MESSAGE,
  payload: chat,
});
