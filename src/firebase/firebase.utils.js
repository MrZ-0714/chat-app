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
      auth.currentUser
        .updateProfile({
          displayName: displayName,
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
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
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
  if (collectionInfo.collectionName === "chatMessages") {
    // Get chat collection
    const chatMessagesRef = firestore.collection(collectionInfo.collectionName);
    // Get latest 15 chat messages
    const chatMessagesToRetrive = chatMessagesRef
      .orderBy("createdAt", "desc")
      .limit(collectionInfo.messageCount);
    // Set up a listener on last 15 messages
    chatMessagesToRetrive.onSnapshot((querySnapshot) => {
      const chatData = [];
      querySnapshot.forEach((doc) => {
        chatData.push({ mId: doc.id, ...doc.data() });
      });
      console.log(
        chatData.sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
      );
      callbackFn(chatData);
    });
  }
};
