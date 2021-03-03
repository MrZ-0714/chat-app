import React from "react";
import "./chat.styles.scss";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import ChatMessage from "../../components/chat-message/chat-message.component";

import { saveChatMessageToFirebase } from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { sendNewMessageAction } from "../../redux/chat/chat.action";
import { createStructuredSelector } from "reselect";
import { selectChatMessages } from "../../redux/chat/chat.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

class ChatPage extends React.Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
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
    const { sendNewMessageProp, currentUser } = this.props;
    const { newMessage } = this.state;

    const newMessageToAdd = {
      id: 6,
      message: newMessage,
      uImgURL: "https://i.ibb.co/GCCdy8t/womens.png",
      uId: currentUser.uid,
    };
    sendNewMessageProp(newMessageToAdd);
    saveChatMessageToFirebase(currentUser, newMessageToAdd).then((res) => {
      if (res !== 0) {
        alert("Message not saved to DB");
      }
    });
    this.setState({ newMessage: "" });
  }

  render() {
    const { newMessage } = this.state;
    const { chatMessagesProp } = this.props;

    return (
      <div className="landing-page">
        <h1>Chat</h1>
        {chatMessagesProp.map(({ id, ...otherProps }) => (
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

const mapDispatchToProps = (dispatch) => ({
  sendNewMessageProp: (newMessage) =>
    dispatch(sendNewMessageAction(newMessage)),
});

const mapStateToProps = createStructuredSelector({
  chatMessagesProp: selectChatMessages,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
