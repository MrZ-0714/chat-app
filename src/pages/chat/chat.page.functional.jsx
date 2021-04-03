import React, { useState, useEffect, useRef } from "react";
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

const ChatPage = ({ currentUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState({
    collectionName: "chatMessages",
    recordsCount: 15,
  });

  const bottomRef = useRef(true);

  useEffect(() => {
    getCollectionData(
      (chatData) => setChatMessages({ chatData }),
      collectionInfo
    );
  }, [currentUser]);

  const handleChange = (event) => {
    const { value } = event.target;
    setNewMessage({ value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
    setNewMessage("");
  };

  const showMoreMessages = () => {
    console.log(collectionInfo);

    setCollectionInfo(
      {
        collectionName: "chatMessages",
        recordsCount: collectionInfo.recordsCount + 5,
      },

      () => {
        getCollectionData(
          (chatData) => setChatMessages({ chatData }),
          collectionInfo
        );
      }
    );
  };

  return (
    <div className="chat-page">
      <h1>Chat</h1>
      <div className="show-more-button-wrapper">
        <Button
          className="show-more-button"
          variant="secondary"
          size="sm"
          block
          onClick={showMoreMessages}
        >
          show previous messages
        </Button>
      </div>
      {chatMessages.map(({ mId, ...otherProps }) => (
        <ChatMessage key={mId} {...otherProps} />
      ))}
      <div ref={bottomRef}></div>
      <div className="send-newMessage-div">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="New message"
              type="text"
              name="newMessage"
              value={newMessage}
              onChange={handleChange}
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
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChatPage);
