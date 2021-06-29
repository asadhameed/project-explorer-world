import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Users from "../users/pages/Users";
import MainNavigation from "../shared/components/navigation/MainNavigation";
import UserPlaces from "../places/pages/UserPlaces";
import Place from "../places/pages/Place";
import PlaceUpdate from "../places/pages/PlaceUpdate";
import Auth from "../users/pages/Auth";
import { AuthContext } from "../shared/contexts/AuthContext";
let timeOutId;
const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  /****************************************************************************
   * Login and logout working correctly But  it is better useCallback hook
   * Login and logout function wraps with use callback so that is not
   * re-create unnecessarily to avoid infinite loops
   *****************************************************************************/
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  const login = useCallback((uid, token, expiration) => {
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60); // server send token which is expire in one hour
    setTokenExpirationDate(tokenExpirationDate);
    console.log(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    console.log(tokenExpirationDate);
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      timeOutId = setTimeout(logout, remainingTime);
    } else clearTimeout(timeOutId);
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const expirationDate = new Date(userData.expiration);
      if (userData.userId && userData.token && expirationDate > new Date()) {
        login(userData.userId, userData.token, expirationDate);
      }
    } catch (error) {
      logout();
    }
  }, [login, logout]);

  let route;
  if (token) {
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
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, login, logout, userId, token }}
      >
        <BrowserRouter>
          <MainNavigation />
          <main>{route}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
