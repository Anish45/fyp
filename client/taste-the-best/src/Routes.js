import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Choose from "./components/Choose";

const Routes = () => {
  return (
    <Router>
      <Route>
        <Switch>
          <Route exact path="/register/step-1" component={Register} />
          <Route exact path="/" component={Login} />
          <Route exact path="/choose" component={Choose} />
          <Redirect to="/" />
        </Switch>
      </Route>
    </Router>
  );
};

export default Routes;
