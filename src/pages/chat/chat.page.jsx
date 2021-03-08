import React from "react";
import "./chat.styles.scss";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import ChatMessage from "../../components/chat-message/chat-message.component";

import {
  saveChatMessageToFirebase,
  getChatCollectionData,
} from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

class ChatPage extends React.Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
      chatMessages: [],
      messageCount: 15,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMoreMessages = this.showMoreMessages.bind(this);
  }

  showMoreMessages() {
    const { messageCount } = this.state;
    console.log(messageCount);
    this.setState({ messageCount: messageCount + 5 });

    getChatCollectionData(
      (chatData) => this.setState({ chatMessages: chatData }),
      messageCount
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    //fetch data from firebase
    const { messageCount } = this.state;

    getChatCollectionData(
      (chatData) => this.setState({ chatMessages: chatData }),
      messageCount
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentUser } = this.props;
    const { newMessage } = this.state;
    const userId = currentUser.uid;

    const newMessageToAdd = {
      message: newMessage,
      uImgURL: `https://avatars.dicebear.com/api/avataaars/${userId}.svg?mouth[]=smile`,
      uId: userId,
    };
    saveChatMessageToFirebase(currentUser, newMessageToAdd);
    this.setState({ newMessage: "" });
  }

  render() {
    const { newMessage, chatMessages } = this.state;
    console.log("I am rendering");
    return (
      <div className="landing-page">
        <h1>Chat</h1>
        <span onClick={this.showMoreMessages}> show previous messages </span>
        {chatMessages.map(({ mId, ...otherProps }) => (
          <ChatMessage key={mId} {...otherProps} />
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChatPage);
