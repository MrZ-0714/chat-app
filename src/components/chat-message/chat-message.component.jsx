import React from "react";
import "./chat-message.styles.scss";

const ChatMessage = ({ message, uId, uImgURL }) => {
  const userId = "user1";
  const msgType = uId === userId ? "sent" : "received";

  console.log("ChatMessage Component re-rendered.");
  return (
    <div className="chat-message">
      <p className={`message ${msgType}`}>{message}</p>
      <img src={uImgURL} alt="userImage" />
    </div>
  );
};

export default ChatMessage;
