import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>

      <li>
        <NavLink to="/u1/places">My Places</NavLink>
      </li>
      <li>
        <NavLink to="/Ad">User</NavLink>
      </li>
      <li>
        <NavLink to="/Ads">User</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
