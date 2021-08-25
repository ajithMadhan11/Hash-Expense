import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import App from "./App";
import Home from "./Components/Core/Home";
import Notfound from "./Components/Notfound";
import Stats from "./Components/Stats";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/home" exact component={Home} />
        <Route path="/signin" exact component={Login} />
        <Route path="/signup" exact component={Register} />
        <Route path="/stats" exact component={Stats} />
        <Route path="*" exact component={Notfound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
