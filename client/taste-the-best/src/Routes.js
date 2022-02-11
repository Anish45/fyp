import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Choose from "./components/Choose";
import HomeLayout from "./components/Home/HomeLayout";
import Profile from "./components/Profile/Profile";
import VisitProfile from "./components/Visit Profile/VisitProfile";
import RecipeDescription from "./components/Recipe Description/RecipeDescription";
import EditRecipe from "./components/Edit Recipe/EditRecipe";
const Routes = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  return (
    <Router>
      <Route>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
          <Route exact path="/choose" component={() => <Choose />} />
          <Route exact path="/home" component={() => <HomeLayout />} />
          <Route exact path="/profile" component={() => <Profile />} />
          <Route
            exact
            path="/visitprofile"
            component={() => <VisitProfile />}
          />
          <Route
            exact
            path="/recipedescription"
            component={() => <RecipeDescription />}
          />
          <Route exact path="/edit" component={() => <EditRecipe />} />
          <Redirect to="/" />
        </Switch>
      </Route>
    </Router>
  );
};

export default Routes;
