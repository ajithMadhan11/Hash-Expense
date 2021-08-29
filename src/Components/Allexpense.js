import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { authUser } from "../action";
import { database, auth } from "../FirebaseConfig";
import Login from "./Authentication/Login";
import ExpenseHome from "./ExpenseHome";
import Navbar from "./Core/Navbar";
import Loader from "./Loader";
import firebase from "firebase/app";

const Allexpense = (props) => {
  const uid = props.auth.user.uid;
  console.log(props);

  const [state, setstate] = useState([]);

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
        getTotalExpenseOfaUser(user.uid);
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
  const getTotalExpenseOfaUser = async (userId) => {
    await database
      .collection(userId)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setstate(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            expense: doc.data(),
          }))
        );
      });
  };
  return (
    <>
      <Navbar />
      {!props.auth.isLoaded ? (
        <Loader />
      ) : props.auth.authenticated ? (
        <ExpenseHome uid={uid} />
      ) : (
        <Login />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Allexpense);
