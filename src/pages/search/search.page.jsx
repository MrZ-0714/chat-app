import React, { useState } from "react";
import "./search.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { getCollectionData } from "../../firebase/firebase.utils";

// import FriendCard from "../../components/friend-card/friend-card.component";
import FriendCard from "../../components/friend-card/friend-card.component";
import FormInputButton from "../../components/form-input-button/form-input-button.component";

const SearchPage = () => {
  const [collectionInfo, setCollectionInfo] = useState({
    collectionName: "users",
    filter: {
      filterName: "displayName",
      filterValue: "MRZ",
    },
  });

  const [searchResult, setSearchResult] = useState({
    userData: {},
  });

  // const [userProfile, setUserProfile] = useState({ friendsData: [] });

  // useEffect(() => {
  //   let isMounted = true; // note this flag denote mount status
  //   // if (isMounted && collectionInfo) {
  //   //   getCollectionData((dataReturned) => {
  //   //     setUserProfile({ friendsData: dataReturned });
  //   //     setcollectionInfo({});
  //   //     console.log(collectionInfo);
  //   //   }, collectionInfo);
  //   // }

  //   return () => {
  //     isMounted = false;
  //   }; // use effect cleanup to set flag false, if unmounted
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
      console.log(dataReturned);
    }, collectionInfo);
  };

  return (
    <div className="search-page">
      I am friends page
      <div>Here will be friends list from db</div>
      <FormInputButton
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={"Search display name"}
        buttonLabel={"Search"}
      />
      {searchResult.userData ? <FriendCard /> : <div>No match</div>}
      <div></div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SearchPage);
