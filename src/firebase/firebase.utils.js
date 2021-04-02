// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/firebase-messaging";

import { firebaseConfig, vapidKey } from "./firebase.config";
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(() => {
    console.log("we have permission");
    return messaging.getToken({
      vapidKey: vapidKey,
    });
  })
  .then((token) => {
    console.log(token);
  })
  .catch((err) => console.log("No permission: ", err));

messaging.onMessage((payload) => {
  console.log(payload);
});

const getServerTimeStamp = () => {
  return new Date();
};

const addRefToArrayOfDoc = (
  collectionName_1,
  collectionName_2,
  docId_1,
  docId_2,
  arrayToBeModified,
  callbackFn
) => {
  const doc_1_Ref = firestore.collection(collectionName_1).doc(docId_1);
  doc_1_Ref
    .update({
      [arrayToBeModified]: firebase.firestore.FieldValue.arrayUnion(
        firestore.collection(collectionName_2).doc(docId_2)
      ),
    })
    .then(() => {
      console.log(
        "Referenced to collection: ",
        collectionName_2,
        " doc: ",
        docId_2,
        " is added to field (array)",
        arrayToBeModified,
        " of collection: ",
        collectionName_1,
        " doc: ",
        docId_1
      );
      callbackFn(0);
    })
    .catch((err) => {
      console.log("Error updating document: ", err);
      callbackFn(1);
    });
};
const addArrayToDoc = (
  collectionName_1,
  collectionName_2,
  docId_1,
  docId_2,
  arrayToBeModified,
  callbackFn
) => {
  const doc_1_Ref = firestore.collection(collectionName_1).doc(docId_1);
  doc_1_Ref
    .update({
      [arrayToBeModified]: firebase.firestore.FieldValue.arrayUnion(docId_2),
    })
    .then(() => {
      console.log(
        "DocId of collection: ",
        collectionName_2,
        " doc: ",
        docId_2,
        " is added to field (array)",
        arrayToBeModified,
        " of collection: ",
        collectionName_1,
        " doc: ",
        docId_1
      );
      callbackFn(0);
    })
    .catch((err) => {
      console.log("Error updating document: ", err);
      callbackFn(1);
    });
};

export const createUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const uid = auth.currentUser.uid;
      auth.currentUser
        .updateProfile({
          displayName: displayName,
          photoURL: `https://avatars.dicebear.com/api/avataaars/${uid}.svg?mouth[]=smile`,
        })
        .then(() => console.log("Display name updated to: " + displayName))
        .catch((e) => console.log("Error update user profile: " + e));
      // Send email verification
      auth.onAuthStateChanged((user) =>
        user
          .sendEmailVerification()
          .then(() => console.log("Email verification sent"))
          .catch((e) => console.log("error sending email verification: " + e))
      );

      console.log(auth.currentUser.uid);
      return userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode + " : " + errorMessage);
    });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email, uid } = userAuth;
    const createdAt = new Date();
    const photoURL = `https://avatars.dicebear.com/api/avataaars/${uid}.svg?mouth[]=smile`;

    try {
      await userRef.set({
        email,
        createdAt,
        photoURL,
        ...additionalData,
      });
    } catch (err) {
      alert("Error creating user" + err.message);
      console.log("Error creating user" + err.message);
    }
  }
};

export const signInWithEmailAndPassword = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      if (!userCredential.emailVerified) {
        alert("Please check your inbox or spam and verify your account!");
      }
      return userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " : " + errorMessage);
    });

export const signOutCurrentUser = () => auth.signOut();

export const saveChatMessageToFirebase = (
  callbackFn,
  currentUser,
  chatMessageToAdd
) => {
  if (!currentUser) {
    alert("Login first to chat");
    return;
  }
  const createdAt = new Date();

  firestore
    .collection("chatMessages")
    .add({
      createdAt,
      ...chatMessageToAdd,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      callbackFn(0);
    })
    .catch((error) => {
      alert("Error adding chat message: " + chatMessageToAdd.message);
      console.error("Error adding document: ", error);
      callbackFn(1);
    });
};

export const checkIfPrivateChatRoomAlreadyExist = (
  currentUserUid,
  targetUserUid,
  callbackFn
) => {
  const privateChatRoomRef = firestore.collection("privateChatRooms");
  console.log(currentUserUid);
  console.log(targetUserUid);
  privateChatRoomRef
    .where("initiatedBy", "==", currentUserUid)
    .where("invitee", "==", targetUserUid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        callbackFn(true);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      callbackFn(false);
    });
};

export const createPrivateChatRoom = (
  callbackFn,
  currentUserUid,
  targetUserUid
) => {
  const createdAt = getServerTimeStamp();

  firestore
    .collection("privateChatRooms")
    .add({
      createdAt,
      initiatedBy: currentUserUid,
      invitee: targetUserUid,
    })
    .then((docRef) => {
      console.log(docRef.id);
      const privateChatRoomId = docRef.id;
      addRefToArrayOfDoc(
        "users",
        "privateChatRooms",
        currentUserUid,
        privateChatRoomId,
        "privateChatRoomList",
        callbackFn
      );
      addRefToArrayOfDoc(
        "users",
        "privateChatRooms",
        targetUserUid,
        privateChatRoomId,
        "privateChatRoomList",
        callbackFn
      );
    });
};

export const getCollectionData = async (callbackFn, queryInfo) => {
  //destructure the input patameters
  const {
    collectionName,
    messageCount = null,
    filter: { filterName, filterValue } = {
      filterName: null,
      filterValue: null,
    },
    docName = null,
    getRefInDoc = null,
    fieldName = null,
    idArray = null,
  } = queryInfo;

  console.log("collectionName: ", collectionName);
  // Define collection
  const collectionDataRef = firestore.collection(collectionName);

  // Get latest 15 chat messages
  if (messageCount) {
    const collectionDataLimited = collectionDataRef
      .orderBy("createdAt", "desc")
      .limit(messageCount);
    // Set up a listener on last 15 messages
    collectionDataLimited.onSnapshot((querySnapshot) => {
      const limitedData = [];
      querySnapshot.forEach((doc) => {
        limitedData.unshift({ mId: doc.id, ...doc.data() });
      });
      callbackFn(limitedData);
    });
  }

  if (fieldName) {
    const docRef = collectionDataRef.doc(docName);
    docRef.get().then((doc) => {
      console.log(doc.data());
      callbackFn({ uid: doc.id, ...doc.data() });
    });
  }

  if (filterName && filterValue) {
    collectionDataRef
      .where(filterName, "==", filterValue)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ uid: doc.id, ...doc.data() });
        });
        callbackFn(data);
      });
  }

  if (idArray) {
    console.log(idArray);
    const dataReturn = [];
    await collectionDataRef
      .where(firebase.firestore.FieldPath.documentId(), "in", idArray)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("Should print me 1", doc.id, " => ", doc.data());
          dataReturn.push({ uid: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    callbackFn(dataReturn);
  }

  // if (docName && getRefInDoc) {
  //   const docRef = collectionDataRef.doc(docName);
  //   console.log("I am in the db call");
  //   try {
  //     const doc = await docRef.get();
  //     const friendRequestsSentTo = doc.data().friendRequestsSentTo;
  //     if (!friendRequestsSentTo) {
  //       callbackFn(10);
  //     }
  //     try {
  //       const friendList = await Promise.all(
  //         friendRequestsSentTo.map(async (friend) => {
  //           try {
  //             const friendRef = await friend.get();
  //             return { uid: friendRef.id, ...friendRef.data() };
  //           } catch (err) {
  //             console.log("There is an err getting frienddata in list", err);
  //           }
  //         })
  //       );
  //       callbackFn(friendList);
  //     } catch (err) {
  //       console.log("There is an error", err);
  //       callbackFn(10);
  //     }
  //   } catch (err) {
  //     console.log("Error getting current user's data reference", err);
  //   }
  // }
};

export const sendFriendRequest = (callbackFn, friendInfo) => {
  const { currentUserId, targetUserId } = friendInfo;
  // modify current user's profile
  addArrayToDoc(
    "users",
    "users",
    currentUserId,
    targetUserId,
    "friendRequestsSentToList",
    callbackFn
  );
  // addRefToArrayOfDoc(
  //   "users",
  //   "users",
  //   currentUserId,
  //   targetUserId,
  //   "friendRequestsSentTo",
  //   callbackFn
  // );
  // modify target user's profile
  addArrayToDoc(
    "users",
    "users",
    targetUserId,
    currentUserId,
    "friendRequestsReceivedFromList",
    callbackFn
  );
};
