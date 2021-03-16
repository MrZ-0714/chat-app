import React, { useState, useEffect } from "react";
import "./friends.styles.scss";

import { getCollectionData } from "../../firebase/firebase.utils";

import FriendCard from "../../components/friend-card/friend-card.component";

const FriendsPage = ({ currentUser }) => {
  const [friendList, setFriendList] = useState({
    friendListData: [],
  });

  useEffect(() => {
    const queryInfo = {
      collectionName: "users",
      docName: currentUser.uid,
      getRefInDoc: true,
    };
    console.log("I just loaded");
    console.log("Printing currentUser: ", currentUser);
    getCollectionData((res) => {
      if (res !== 1) {
        console.log("I am back to friend page", res);
        setFriendList({ friendListData: res });
      } else {
        console.log("Error getting friend data from firestore.");
      }
    }, queryInfo);
  }, []);

  return (
    <div className="friends-page">
      <div>Friends: </div>
      {friendList.friendListData.length > 0 ? (
        <div>
          {friendList.friendListData.map(({ uid, ...otherProps }) => (
            <FriendCard key={uid} {...otherProps} />
          ))}
        </div>
      ) : (
        <div>No friend, add one by press the + button</div>
      )}
    </div>
  );
};

export default FriendsPage;
