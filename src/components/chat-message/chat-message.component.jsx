import React from "react";
import "./chat-message.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const ChatMessage = ({ message, uId, uImgURL, currentUser }) => {
  const userId = currentUser.uid;
  const msgType = uId === userId ? "sent" : "received";

  console.log("ChatMessage Component re-rendered.");
  return (
    <div className="chat-message">
      <p className={`message ${msgType}`}>{message}</p>
      <img src={uImgURL} alt="userImage" />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChatMessage);
