export const addNewChatMessages = (currentChatMessages, chatMessagesToAdd) => {
  return [...currentChatMessages, { chatMessagesToAdd }];
};