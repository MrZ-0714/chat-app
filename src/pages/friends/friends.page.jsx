import React, { useState, useEffect } from "react";
import "./friends.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { getCollectionData } from "../../firebase/firebase.utils";

import FriendCard from "../../components/friend-card/friend-card.component";

const FriendsPage = ({ currentUser }) => {
  const [state, setState] = useState({
    friendsData: [],
    collectionInfo: {
      collectionName: "users",
      filter: {
        filterName: "displayName",
        filterValue: "MRZ",
      },
    },
  });

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    isMounted &&
      getCollectionData((dataReturned) => {
        setState({ friendsData: dataReturned });
        console.log("state is: " + state);
      }, state.collectionInfo);
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  });

  return (
    <div className="friends-page">
      I am friends page
      <div>Here will be friends list from db</div>
      {/* <FriendCard currentUser={currentUser} /> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(FriendsPage);
