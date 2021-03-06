// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebase.config";
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

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

export const saveChatMessageToFirebase = (currentUser, chatMessageToAdd) => {
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
      return 0;
    })
    .catch((error) => {
      alert("Error adding chat message: " + chatMessageToAdd.message);
      console.error("Error adding document: ", error);
      return 1;
    });
};

export const getCollectionData = (callbackFn, collectionInfo) => {
  const {
    collectionName,
    messageCount = null,
    filter: { filterName, filterValue } = {
      filterName: null,
      filterValue: null,
    },
  } = collectionInfo;

  console.log("collectionName: " + collectionName);
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

  if (filterName && filterValue) {
    console.log(filterName);
    collectionDataRef
      .where(filterName, "==", filterValue)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data.push({ uid: doc.id, ...doc.data() });
        });
        console.log("In data call");
        console.log(data);
        callbackFn(data);
      });
  }
};

export const addFriendToCurrentUser = (callbackFn, friendInfo) => {
  const { currentUserId, toBeAddedUserId } = friendInfo;
  console.log(currentUserId);
  console.log(toBeAddedUserId);
  const currentUserRef = firestore.collection("users").doc(currentUserId);
  console.log(currentUserRef);

  currentUserRef
    .update({
      friendList: firebase.firestore.FieldValue.arrayUnion(
        firestore.collection("users").doc(toBeAddedUserId)
      ),
    })
    .then(() => {
      console.log("user: ", toBeAddedUserId, "is added to uses", currentUserId);
      callbackFn(0);
    })
    .catch((err) => console.log("Error updating document: ", err));
};
