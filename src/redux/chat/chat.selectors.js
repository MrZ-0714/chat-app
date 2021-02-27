import { createSelector } from "reselect";

const selectMessages = (state) => state.newMessage;

export const selectLast15Messages = createSelector(
  [selectMessages],
  (newMessage) => newMessage.newMessage
);
