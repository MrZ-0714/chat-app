import React from "react";
import "./chat-message.styles.scss";

const ChatMessage = ({ props }) => {
  const { message, uId, uImgURL } = props;
  const userId = "sample";
  const msgType = uId === userId ? "sent" : "received";

  return (
    <div>
      <p class={`message ${msgType}`}>{message}</p>
      <img src={uImgURL} alt="userImage" />
    </div>
  );
};

export default ChatMessage;
