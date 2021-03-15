import React, { useState, useEffect } from "react";
import "./friends.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { getCollectionData } from "../../firebase/firebase.utils";

// import FriendCard from "../../components/friend-card/friend-card.component";
import FormInputButton from "../../components/form-input-button/form-input-button.component";

const FriendsPage = ({ currentUser }) => {
  const [friendList, setFriendList] = useState({
    friendListData: [],
  });
  const [search, setSearch] = useState({
    searchFor: "",
  });
  const handleChange = (event) => {
    setSearch({ searchFor: event.target.value });
  };

  useEffect(() => {
    const queryInfo = {
      collectionName: "users",
      docName: "1eOyvAOC4KfJtn0OnKWbG2OG9eE2",
      getRefInDoc: true,
    };
    console.log("I just loaded");
    getCollectionData((res) => {
      
      console.log("I am back to friend page", res);
      res.push("aaaaaa");
      setFriendList({ friendListData: res });
    }, queryInfo);
    console.log("I am after call back");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted to service");
  };

  return (
    <div className="friends-page">
      I am friends page
      <div>Here will be friends list from db</div>
      <FormInputButton
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={"Search display name"}
        buttonLabel={"Search"}
      />
      <div>{search.searchFor}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(FriendsPage);
