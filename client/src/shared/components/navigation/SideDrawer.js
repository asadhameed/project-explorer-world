import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
const SideDrawer = (props) => {
  const contents = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    contents,
    document.getElementById("side_drawer")
  );
};

export default SideDrawer;
