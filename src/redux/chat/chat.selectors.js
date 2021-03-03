import { createSelector } from "reselect";

const selectMessages = (state) => state.chatMessages;

export const selectChatMessages = createSelector(
  [selectMessages],
  (chatMessages) => chatMessages.chatMessages
);
