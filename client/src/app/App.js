import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Users from "../users/pages/Users";
import Places from "../places/pages/Places";
import MainNavigation from "../shared/components/navigation/MainNavigation";
import UserPlaces from "../places/pages/UserPlaces";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/places/new" exact>
              <Places />
            </Route>
            <Route path="/:userId/places">
              <UserPlaces />
            </Route>

            {/* <Route path="/" exact component={Users} /> */}
            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
