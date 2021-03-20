import React, { useState } from "react";
import "./search.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import {
  getCollectionData,
  sendFriendRequest,
} from "../../firebase/firebase.utils";

import Button from "react-bootstrap/Button";
import FriendCard from "../../components/friend-card/friend-card.component";
import FormInputButton from "../../components/form-input-button/form-input-button.component";

const SearchPage = ({ currentUser }) => {
  const [collectionInfo, setCollectionInfo] = useState({
    collectionName: "users",
    filter: {
      filterName: "displayName",
      filterValue: null,
    },
  });

  const [searchResult, setSearchResult] = useState({
    userData: {},
  });

  const handleChange = (event) => {
    setCollectionInfo({
      collectionName: "users",
      filter: {
        filterName: "displayName",
        filterValue: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    getCollectionData((dataReturned) => {
      setSearchResult({ userData: dataReturned });
    }, collectionInfo);
  };

  const handleClick_addFriend = () => {
    const friendRequestInfo = {
      currentUserId: currentUser.uid,
      targetUserId: searchResult.userData[0].uid,
    };
    sendFriendRequest((res) => {
      res
        ? alert("There is an error adding friend")
        : console.log("Friend request sent successfully with response: ", res);
    }, friendRequestInfo);
  };

  return (
    <div className="search-page">
      Search to add friend
      <FormInputButton
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={"Search display name"}
        buttonLabel={"Search"}
      />
      {searchResult.userData.length > 0 ? (
        <div>
          {searchResult.userData.map(({ uid, ...otherProps }) => (
            <FriendCard key={uid} buttonFunction={"Detail"} {...otherProps} />
          ))}
          <Button
            variant="outline-success"
            size="md"
            block
            onClick={handleClick_addFriend}
          >
            Add friend
          </Button>
        </div>
      ) : (
        <div>No match</div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SearchPage);
