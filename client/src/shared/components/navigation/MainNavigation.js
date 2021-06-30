import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";
const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <React.Fragment>
      {isDrawerOpen && (
        <Backdrop onClick={() => setIsDrawerOpen(false)}></Backdrop>
      )}

      <SideDrawer show={isDrawerOpen} onClick={() => setIsDrawerOpen(false)}>
        <nav className=".main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn "
          onClick={() => setIsDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
          <span />
        </button>

        {/* <Link to="/">
          <h1 className="main-navigation__title">Your Places</h1>
        </Link> */}
        <a
          rel="noopener noreferrer"
          href="https://github.com/asadhameed/project-explorer-world"
          target="_blank"
        >
          <h2 className="main-navigation__title">Project Code on github</h2>
        </a>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
