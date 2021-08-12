import firebase from "firebase/app";
import "firebase/auth";

export function googleSignInPopup(provider) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
    })
    .catch((error) => {
      var errorMessage = error.message;
    });
}
export function facebookSignInPopup(provider) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log(user);
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}
