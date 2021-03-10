import React from "react";
import "./friends.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import FriendCard from "../../components/friend-card/friend-card.component";

const FriendsPage = ({ currentUser }) => {
  return (
    <div className="friends-page">
      I am friends page
      <div>Here will be friends list from db</div>
      <FriendCard currentUser={currentUser} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(FriendsPage);
