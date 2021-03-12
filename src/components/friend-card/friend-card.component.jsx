import React from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Redux

const FriendCard = () => {
  return (
    <Container>
      <Row>
        <Col xs={3} md={3} lg={3} className="friend-avatar-div">
          <img
            className="friend-avatar-img"
            src="https://avatars.dicebear.com/api/avataaars/zGKZiEa6rFULgxpu5pWPvvEK6aC2.svg?mouth[]=smile"
            alt="user avatar"
          />
        </Col>
        <Col xs={9} md={9} lg={9}>
          <Row>
            <Col>UserNamePlaceHolder</Col>
          </Row>
          <Row>
            <Col>UserID placeholder</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendCard;
