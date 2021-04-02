import React, { useState, useEffect } from "react";

import "./friends.styles.scss";

import { getCollectionData } from "../../firebase/firebase.utils";

import FriendCard from "../../components/friend-card/friend-card.component";

const FriendsPage = (currentUser) => {
  const [friendList, setFriendList] = useState({
    friendListData: [],
  });

  useEffect(() => {
    console.log("CurrentUser received in FirendsPage", currentUser);
    //config query for firebase call

    try {
      const currentUserInfo = {
        collectionName: "users",
        docName: currentUser.currentUser.uid,
        fieldName: "friendRequestsSentToList",
      };
      getCollectionData((res) => {
        console.log("I am in first callback");
        if (res) {
          const getAllUsersInFriendList = {
            collectionName: "users",
            idArray: res.friendRequestsSentToList,
          };
          getCollectionData((res) => {
            console.log("I am in second callBack", res);
            setFriendList({ friendListData: res });
          }, getAllUsersInFriendList);
        }
      }, currentUserInfo);
    } catch (err) {
      console.log(
        "ERROR -> FriendsPage -> useEffect -> first getCollectionData ",
        err
      );
    }
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
