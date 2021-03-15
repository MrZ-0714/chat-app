import React, { useState } from "react";
import "./search.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import {
  getCollectionData,
  addFriendToCurrentUser,
} from "../../firebase/firebase.utils";

// import FriendCard from "../../components/friend-card/friend-card.component";
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

  // const [friendInfo, setFriendInfo] = useState({
  //   currentUserId: currentUser.uid,
  //   targetUserId: null,
  // });
  // const [friendInfo, setFriendInfo] = useState({
  //   currentUserId: "1eOyvAOC4KfJtn0OnKWbG2OG9eE2",
  //   targetUserId: "CZmlpYUqQ7OZVvUOg5Ia4bQZazE2",
  // });

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
    console.log("Form submitted to service with data: ");
    console.log(collectionInfo);

    getCollectionData((dataReturned) => {
      setSearchResult({ userData: dataReturned });
    }, collectionInfo);
  };

  const handleClick = () => {
    const friendInfo = {
      currentUserId: currentUser.uid,
      targetUserId: searchResult.userData[0].uid,
    };

    console.log(friendInfo);

    addFriendToCurrentUser((res) => {
      res
        ? alert("There is an error adding friend")
        : alert("Request send to user");
    }, friendInfo);
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
            <FriendCard key={uid} {...otherProps} />
          ))}
          <Button
            variant="outline-success"
            size="md"
            block
            onClick={handleClick}
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
