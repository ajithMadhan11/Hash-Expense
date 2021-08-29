import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const app = {
  //your congig
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(app);
const auth = firebase.auth();
// const database = firebase.database();
const database = firebase.firestore(firebaseApp);
export { database, auth };
