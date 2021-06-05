import React from "react";
import ReactDOM from "react-dom";
import "./Backdrop.css";
const Backdrop = (props) => {
  const backdropElement = (
    <div className="backDropClass" onClick={props.onClick}></div>
  );
  return ReactDOM.createPortal(
    backdropElement,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
