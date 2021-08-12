import { CONSTANTS } from "../action";
import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "../FirebaseConfig";

const initialState = {
  authenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case CONSTANTS.AUTH_USER:
    default:
      return state;
  }
};

export default authReducer;
