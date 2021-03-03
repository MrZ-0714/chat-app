export const addNewChatMessages = (currentChatMessages, chatMessageToAdd) => {
  return [...currentChatMessages,  ...chatMessageToAdd ];
};