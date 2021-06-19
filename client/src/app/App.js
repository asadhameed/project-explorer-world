import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Users from "../users/pages/Users";
import MainNavigation from "../shared/components/navigation/MainNavigation";
import UserPlaces from "../places/pages/UserPlaces";
import Place from "../places/pages/Place";
import PlaceUpdate from "../places/pages/PlaceUpdate";
import Auth from "../users/pages/Auth";
import { AuthContext } from "../shared/contexts/AuthContext";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /****************************************************************************
   * Login and logout working correctly But  it is better useCallback hook
   * Login and logout function wraps with use callback so that is not
   * re-create unnecessarily to avoid infinite loops
   *****************************************************************************/
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);
  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  let route;
  if (isLoggedIn) {
    route = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <Place />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/place/:placeId">
          <PlaceUpdate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <MainNavigation />
          <main>{route}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
