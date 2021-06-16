import React from "react";
import "./Place.css";
import Input from "../../shared/components/formElements/Input";
const Place = () => {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="title" />
    </form>
  );
};

export default Place;
