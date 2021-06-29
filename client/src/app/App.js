import React, { Suspense } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import MainNavigation from "../shared/components/navigation/MainNavigation";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../shared/contexts/AuthContext";
import { useAuthHook } from "../shared/hooks/auth-hook";
//import Users from "../users/pages/Users";s
//import UserPlaces from "../places/pages/UserPlaces";
//import Place from "../places/pages/Place";
//import PlaceUpdate from "../places/pages/PlaceUpdate";
//import Auth from "../users/pages/Auth";

const Users = React.lazy(() => import("../users/pages/Users"));
const UserPlaces = React.lazy(() => import("../places/pages/UserPlaces"));
const Place = React.lazy(() => import("../places/pages/Place"));
const PlaceUpdate = React.lazy(() => import("../places/pages/PlaceUpdate"));
const Auth = React.lazy(() => import("../users/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuthHook();
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
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {route}
            </Suspense>
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
