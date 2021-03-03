import React from "react";
import "./chat-conversations.styles.scss";
import chatConversationsData from "./chat-conversations.mock-data";
import ChatMessage from "../chat-message/chat-message.component";

class ChatConversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatConversations: chatConversationsData,
    };
  }
  render() {
    const { chatConversations } = this.state;

    return (
      <div className="landing-page">
        {chatConversations.map(({ id, ...otherProps }) => (
          <ChatMessage key={id} {...otherProps} />
        ))}
      </div>
    );
  }
}

export default ChatConversations;
