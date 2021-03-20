import React from "react";
import "./nav-bar.styles.scss";

// React-bootstrap
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
    <Nav variant="pills" fill className="nav-bar">
      <Nav.Item>
        <LinkContainer to="/private-room">
          <Nav.Link>Chats</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/friends">
          <Nav.Link>Friends</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/me">
          <Nav.Link>Me</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/chat">
          <Nav.Link>Chat</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
