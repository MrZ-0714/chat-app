import React from "react";
import "./chat.styles.scss";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import ChatMessage from "../../components/chat-message/chat-message.component";
import chatMessages from "./chat.mock-data";

class ChatPage extends React.Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
      chatMessages: chatMessages,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { newMessage, chatMessages } = this.state;

    return (
      <div className="landing-page">
        <h1>Chat</h1>
        {chatMessages.map(({ id, ...otherProps }) => (
          <ChatMessage key={id} {...otherProps} />
        ))}
        <form>
          <FormInput
            type="text"
            name="newMessage"
            value={newMessage}
            onChange={this.handleChange}
            label="New Message"
            required
          />
          <CustomButton> Send </CustomButton>
        </form>
      </div>
    );
  }
}

export default ChatPage;
