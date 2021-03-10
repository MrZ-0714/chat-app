import React from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Redux

const FriendCard = ({ currentUser }) => {
  return (
    <Container>
      <Row>
        <Col>
          <img
            src="https://avatars.dicebear.com/api/avataaars/zGKZiEa6rFULgxpu5pWPvvEK6aC2.svg?mouth[]=smile"
            alt="user avatar"
          />
          test
        </Col>
        <Col>
          <Row>
            <Col>{currentUser.displayName}</Col>
          </Row>
          <Row>
            <Col>{currentUser.uid}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendCard;
