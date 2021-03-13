import React from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Redux

const FriendCard = ({ displayName, email, photoURL }) => {
  return (
    <Container>
      <Row>
        <Col xs={3} md={3} lg={3} className="friend-avatar-div">
          <img className="friend-avatar-img" src={photoURL} alt="user avatar" />
        </Col>
        <Col xs={9} md={9} lg={9}>
          <Row>
            <Col>{displayName}</Col>
          </Row>
          <Row>
            <Col>{email}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendCard;
