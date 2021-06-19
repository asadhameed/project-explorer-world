import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./NavLinks.css";

const NavLinks = () => {
  const authContext = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {authContext.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      <li>
        {authContext.isLoggedIn ? (
          <button onClick={authContext.logout}>LOGOUT</button>
        ) : (
          <NavLink to="/auth">Authenticate</NavLink>
        )}
      </li>
    </ul>
  );
};

export default NavLinks;
