import { CONSTANTS } from "../action";
import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "../FirebaseConfig";

const initialState = {
  authenticated: false,
  user: "",
  error: "",
  isLoaded: false,
};

const authReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case CONSTANTS.AUTH_USER:
      console.log("called", action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
