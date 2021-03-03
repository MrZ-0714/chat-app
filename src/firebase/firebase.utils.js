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

export const createUserWithEmailAndPassword = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode + " : " + errorMessage);
      // ..
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

  return userRef;
};

export const signInWithEmailAndPassword = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " : " + errorMessage);
    });

export const signOutCurrentUser = () => auth.signOut();

export const saveChatMessageToFirebase = async (
  currentUser,
  chatMessageToAdd
) => {
  if (!currentUser) {
    alert("Login first to chat");
    return;
  }

  const chatRef = firestore.doc(`chatMessages/${currentUser.uid}`);
  const snapShot = await chatRef.get();

  if (!snapShot.exists) {
    const createdAt = new Date();

    try {
      await chatRef.set({
        createdAt,
        ...chatMessageToAdd,
      });
    } catch (err) {
      console.log("Error save chat: " + err.message);
    }
  }

  return 0;
};
