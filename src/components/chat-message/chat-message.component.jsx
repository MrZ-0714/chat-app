import React from "react";
import "./chat-message.styles.scss";

const ChatMessage = ({ message, uId, uImgURL }) => {
  const userId = "sample";
  const msgType = uId === userId ? "sent" : "received";

  console.log({message});
  return (
    <div className="chat-message">
      <p className={`message ${msgType}`}>{message}</p>
      <img src={uImgURL} alt="userImage" />
    </div>
  );
};

export default ChatMessage;
