import "./App.css";
import React, { useEffect } from "react";
import Login from "./Components/Authentication/Login";
import firebase from "firebase/app";
import { authUser } from "./action";
import { connect } from "react-redux";
import Home from "./Components/Core/Home";
import Loader from "./Components/Loader";
import Navbar from "./Components/Core/Navbar";

const App = (props) => {
  console.log(props);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userState = {
          authenticated: true,
          user: {
            name: user.displayName,
            uid: user.uid,
            email: user.email,
          },
          error: "",
          isLoaded: true,
        };
        props.dispatch(authUser(userState));
      } else {
        const userState = {
          authenticated: false,
          user: "",
          error: "no user logged in",
          isLoaded: true,
        };
        props.dispatch(authUser(userState));
      }
    });
  }, []);
  return (
    <>
      {!props.auth.isLoaded ? (
        <Loader />
      ) : props.auth.authenticated ? (
        <Home />
      ) : (
        <Login />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
