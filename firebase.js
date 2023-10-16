import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSgFkweRWPo5C5qP-wH-H4O3KdD6TieLU",
  authDomain: "practicing-7474f.firebaseapp.com",
  projectId: "practicing-7474f",
  storageBucket: "practicing-7474f.appspot.com",
  messagingSenderId: "733397323877",
  appId: "1:733397323877:web:1e880a269992134b13f68c",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore(); // Corrected typo here
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
