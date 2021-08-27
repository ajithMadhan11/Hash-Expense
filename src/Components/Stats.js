import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { authUser } from "../action";
import { database, auth } from "../FirebaseConfig";
import Login from "./Authentication/Login";
import StatsHome from "./Authentication/StatsHome";
import Navbar from "./Core/Navbar";
import Loader from "./Loader";
import firebase from "firebase/app";

const Stats = (props) => {
  const uid = props.auth.user.uid;
  console.log(uid);

  const [state, setstate] = useState([]);

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

  useEffect(() => {
    getTotalExpenseOfaUser(uid);
  }, []);
  return (
    <>
      <Navbar />
      {!props.auth.isLoaded ? (
        <Loader />
      ) : props.auth.authenticated ? (
        <StatsHome allExpense={state} />
      ) : (
        <Login />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Stats);
