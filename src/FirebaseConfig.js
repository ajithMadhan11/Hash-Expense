import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const app = {
  apiKey: "AIzaSyDkA7_68QcrXxgdI84lh6tkOOZfsSULVZE",
  authDomain: "expense-tracker-c0145.firebaseapp.com",
  databaseURL: "https://expense-tracker-c0145-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-c0145",
  storageBucket: "expense-tracker-c0145.appspot.com",
  messagingSenderId: "779290897206",
  appId: "1:779290897206:web:6fcb564352584fba9fe197",
  measurementId: "G-5Z45WE5300",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(app);
const auth = firebase.auth();
// const database = firebase.database();
const database = firebase.firestore(firebaseApp);
export { database, auth };
