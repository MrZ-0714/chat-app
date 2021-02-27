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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { chatMessages, newMessage } = this.state;
    const newMessageToAdd = {
      id: 4,
      message: newMessage,
      uImgURL: "https://i.ibb.co/GCCdy8t/womens.png",
      uId: "user1",
    };
    console.log(chatMessages);

    this.setState({
      newMessage: "",
      chatMessages: [...chatMessages, newMessageToAdd],
    });
    console.log(this.state.chatMessages);
  }

  render() {
    const { newMessage, chatMessages } = this.state;

    return (
      <div className="landing-page">
        <h1>Chat</h1>
        {chatMessages.map(({ id, ...otherProps }) => (
          <ChatMessage key={id} {...otherProps} />
        ))}
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="newMessage"
            value={newMessage}
            onChange={this.handleChange}
            label="New Message"
            required
          />
          <CustomButton type="submit"> Send </CustomButton>
        </form>
      </div>
    );
  }
}

export default ChatPage;
