import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { authUser } from "../../action";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavbarConatainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #b2d9e1;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
`;
const MobileNavbar = styled.div`
  display: none;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #b2d9e1;
    display: flex;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
  }
`;
const NavbarTitle = styled.h3`
  color: #000000;
  margin-left: 10px;
`;
const NavbarMenu = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;
const MobileNavbarItems = styled.div`
  font-size: medium;
  color: #000000;
`;
const MenuItems = styled.p`
  font-size: medium;
  color: #000000;
  margin-right: 20px;
`;
const LogoutBtn = styled.span`
  font-size: medium;
  margin-right: 20px;
  color: #f90707;
  text-decoration: none;
  background-color: #b2d9e1;
  &:hover {
    cursor: pointer;
  }
`;
const currenttab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#27b05a",
      textDecoration: "none",
      backgroundColor: "#b2d9e1",
    };
  } else {
    return {
      color: "black",
      textDecoration: "none",
      backgroundColor: "#b2d9e1",
    };
  }
};
const Navbar = (props) => {
  const { history } = props;
  const signoutFromApp = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const userState = {
          error: "Failed signout",
          isLoaded: true,
        };
        props.dispatch(authUser(...props.auth, userState));
      })
      .catch((error) => {
        toast.error(error.errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <NavbarConatainer>
      <NavbarTitle>
        <Icon icon="icon-park:hashtag-key" /> Hash your Expense
      </NavbarTitle>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavbarMenu>
        <MenuItems>
          <Link style={currenttab(history, "/")} to="/">
            <Icon icon="ant-design:home-filled" /> Home
          </Link>
        </MenuItems>
        <MenuItems>
          <Link style={currenttab(history, "/stats")} to="/stats">
            <Icon icon="ion:stats-chart" /> Stats
          </Link>
        </MenuItems>
        <MenuItems>
          <Link style={currenttab(history, "/settings")} to="/settings">
            <Icon icon="ci:settings-filled" /> Settings
          </Link>
        </MenuItems>
        <MenuItems onClick={signoutFromApp}>
          <LogoutBtn onClick={signoutFromApp}>
            <Icon icon="websymbol:logout" /> Logout
          </LogoutBtn>
        </MenuItems>
      </NavbarMenu>
      <MobileNavbar>
        <MobileNavbarItems>
          {" "}
          <Link style={currenttab(history, "/")} to="/">
            <Icon icon="ant-design:home-filled" width="23" height="23" />
          </Link>
        </MobileNavbarItems>
        <MobileNavbarItems>
          <Link style={currenttab(history, "/stats")} to="/stats">
            <Icon icon="ion:stats-chart" width="23" height="23" />
          </Link>
        </MobileNavbarItems>
        <MobileNavbarItems>
          <Link style={currenttab(history, "/settings")} to="/settings">
            <Icon icon="ci:settings-filled" width="23" height="23" />
          </Link>
        </MobileNavbarItems>
        <MobileNavbarItems>
          <LogoutBtn onClick={signoutFromApp}>
            <Icon icon="websymbol:logout" width="23" height="23" />
          </LogoutBtn>
        </MobileNavbarItems>
      </MobileNavbar>
    </NavbarConatainer>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps)(Navbar));
