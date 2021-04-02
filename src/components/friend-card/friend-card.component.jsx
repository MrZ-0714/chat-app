import React from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import {
  createPrivateChatRoom,
  checkIfPrivateChatRoomAlreadyExist,
} from "../../firebase/firebase.utils.js";

//Redux

const FriendCard = ({
  displayName,
  email,
  photoURL,
  currentUserUid,
  selectedUid,
  buttonFunction,
}) => {
  console.log(buttonFunction);
  const goToPrivateChatRoom = () => {
    console.log("Go to private chat-room");
  };

  const doNothing = () => {
    console.log("Do nothing");
  };

  const buttonClick = () => {
    switch (buttonFunction) {
      case "Chat":
        createPrivateChatRoom(
          (res) => console.log(res),
          currentUserUid,
          selectedUid
        );
        checkIfPrivateChatRoomAlreadyExist(
          currentUserUid,
          selectedUid,
          (res) => {
            res ? goToPrivateChatRoom() : console.log("Will create new room");
          }
        );
        break;
      case "Detail":
        break;
      default:
        doNothing();
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={2} md={2} lg={2} className="friend-avatar-div">
          <img className="friend-avatar-img" src={photoURL} alt="user avatar" />
        </Col>
        <Col xs={8} md={8} lg={8}>
          <Row>
            <Col>{displayName}</Col>
          </Row>
          <Row>
            <Col>{email}</Col>
          </Row>
        </Col>
        <Col xs={2} md={2} lg={2}>
          <Button variant="outline-success" onClick={buttonClick}>
            {buttonFunction}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendCard;
