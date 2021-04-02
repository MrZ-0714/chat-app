import React, { useState, useEffect } from "react";

import "./friends.styles.scss";

import { getCollectionData } from "../../firebase/firebase.utils";

import FriendCard from "../../components/friend-card/friend-card.component";

const FriendsPage = (currentUser) => {
  const [friendList, setFriendList] = useState({
    friendListData: [],
  });

  useEffect(() => {
    console.log("Got currentUser in FirendsPage", currentUser);
    //config query for firebase call
    const queryInfo = {
      collectionName: "users",
      docName: currentUser.currentUser.uid,
      getRefInDoc: true,
    };

    getCollectionData((res) => {
      if (res === 10) {
        console.log("No friend return");
        setFriendList({
          friendListData: [
            {
              displayName: "You don't have friend",
              email: "Please click the + to add more friends",
              uid: 0,
            },
          ],
        });
      } else if (res !== 0) {
        console.log("I am back to friend page", res);
        setFriendList({ friendListData: res });
      } else {
        console.log("Error getting friend data from firestore.");
      }
    }, queryInfo);

    const currentUserInfo = {
      collectionName: "users",
      docName: currentUser.currentUser.uid,
      fieldName: "friendRequestsSentToList",
    };

    getCollectionData((res) => {
      console.log("I am in first callback");
      const getAllUsersInFriendList = {
        collectionName: "users",
        idArray: res.friendRequestsSentToList,
      };
      getCollectionData((res) => {
        console.log("I am in second callBack", res);
        setFriendList({ friendListData: res });
      }, getAllUsersInFriendList);
    }, currentUserInfo);
  }, [currentUser]);

  return (
    <div className="friends-page">
      <div>My friends: </div>
      {friendList.friendListData.length > 0 ? (
        <div>
          {friendList.friendListData.map(({ uid, ...otherProps }) => (
            <FriendCard
              key={uid}
              currentUserUid={currentUser.currentUser.uid}
              selectedUid={uid}
              buttonFunction={"Chat"}
              {...otherProps}
            />
          ))}
        </div>
      ) : (
        <div>Loading friend list </div>
      )}
    </div>
  );
};

export default FriendsPage;
