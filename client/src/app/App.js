import React, { useState } from "react";
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
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <MainNavigation />
          <main>
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
              <Route path="/auth" exact>
                <Auth />
              </Route>

              {/* <Route path="/" exact component={Users} /> */}
              <Redirect to="/" />
            </Switch>
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
