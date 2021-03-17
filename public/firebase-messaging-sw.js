import firebase from "firebase\firebase-app";
import firebaseConfig from "../src/firebase/firebase.config";
import "firebase/firebase-messaging";

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
