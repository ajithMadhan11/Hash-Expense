import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <Navbar />
      <p>
        name <span>{props.auth.user.name}</span>
      </p>
      <p>
        email <span>{props.auth.user.email}</span>
      </p>
      <p>
        uid<span>{props.auth.user.uid}</span>
      </p>
      <p>
        authenticated<span>{props.auth.authenticated}</span>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Home);
