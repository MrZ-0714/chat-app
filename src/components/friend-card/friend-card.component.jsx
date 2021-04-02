import React from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import {
  createPrivateChatRoom,
  getCollectionData,
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
  const queryInfo = {
    collectionName: "users",
    docName: selectedUid,
    fieldName: "privateChatRoomsObj",
  };
  const goToPrivateChatRoom = () => {
    console.log("Go to private chat-room");
  };

  const doNothing = () => {
    console.log("Do nothing");
  };

  const buttonClick = () => {
    switch (buttonFunction) {
      case "Chat":
        getCollectionData((res) => {
          console.log("button click callback");
          res.privateChatRoomsObj && res.privateChatRoomsObj[currentUserUid]
            ? goToPrivateChatRoom()
            : createPrivateChatRoom(
                (res) => {
                  if (!res) {
                    goToPrivateChatRoom();
                  }
                  console.log(
                    "ERROR -> FriendPage -> Friend-Card-Component -> buttonClickFn -> createPrivateChatRoom"
                  );
                },
                currentUserUid,
                selectedUid
              );
        }, queryInfo);
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
