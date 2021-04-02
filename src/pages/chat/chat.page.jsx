import React from "react";
import "./chat.styles.scss";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import ChatMessage from "../../components/chat-message/chat-message.component";

import {
  saveChatMessageToFirebase,
  getCollectionData,
} from "../../firebase/firebase.utils";
//Redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

class ChatPage extends React.Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
      chatMessages: [],
      collectionInfo: {
        collectionName: "chatMessages",
        recordsCount: 15,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMoreMessages = this.showMoreMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  messagesEndRef = React.createRef();

  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  showMoreMessages() {
    const { collectionInfo } = this.state;
    console.log(collectionInfo);

    this.setState(
      {
        collectionInfo: {
          collectionName: "chatMessages",
          messageCount: collectionInfo.messageCount + 5,
        },
      },
      () => {
        console.log(this.state);
        getCollectionData(
          (chatData) => this.setState({ chatMessages: chatData }),
          collectionInfo
        );
      }
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    //fetch data from firebase
    const { collectionInfo } = this.state;

    getCollectionData(
      (chatData) => this.setState({ chatMessages: chatData }),
      collectionInfo
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentUser } = this.props;
    const { newMessage } = this.state;
    const userId = currentUser.uid;
    const userDisplayName = currentUser.displayName;

    const newMessageToAdd = {
      message: newMessage,
      uImgURL: `https://avatars.dicebear.com/api/avataaars/${userId}.svg?mouth[]=smile`,
      uId: userId,
      uDisplayName: userDisplayName,
    };
    saveChatMessageToFirebase(
      (res) => {
        if (res) {
          alert("Error sending message");
        } else {
          console.log("Message sent");
        }
      },
      currentUser,
      newMessageToAdd
    );
    this.setState({ newMessage: "" });
  }

  render() {
    const { newMessage, chatMessages } = this.state;
    console.log("Rendering chat-page");

    return (
      <div className="chat-page">
        <h1>Chat</h1>
        <div className="show-more-button-wrapper">
          <Button
            className="show-more-button"
            variant="secondary"
            size="sm"
            block
            onClick={this.showMoreMessages}
          >
            show previous messages
          </Button>
        </div>
        {chatMessages.map(({ mId, ...otherProps }) => (
          <ChatMessage key={mId} {...otherProps} />
        ))}
        <div ref={this.messagesEndRef}></div>
        <div className="send-newMessage-div">
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="New message"
                type="text"
                name="newMessage"
                value={newMessage}
                onChange={this.handleChange}
                label="New Message"
                required
              />
              <InputGroup.Append>
                <Button variant="outline-primary" type="submit">
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChatPage);
