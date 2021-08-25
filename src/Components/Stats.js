import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { database } from "../FirebaseConfig";

const Stats = ({ auth }) => {
  const uid = auth.user.uid;
  console.log(auth);
  const [state, setstate] = useState([]);
  useEffect(() => {
    getTotalExpenseOfaUser(uid);
    console.log(state);
  }, []);

  const getTotalExpenseOfaUser = (userId) => {
    database
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
  return <div>Stats</div>;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Stats);
