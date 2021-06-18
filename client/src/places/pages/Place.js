import React, { useCallback, useReducer } from "react";
import "./Place.css";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form_hook";

const Place = () => {
  const [state, onInputHandler] = useForm();
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(state.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid title"
        onInput={onInputHandler}
      />
      <Input
        id="description"
        element="textArea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="PLease Enter a valid description (at least 5 characters)"
        onInput={onInputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={onInputHandler}
      />
      <Button type="submit" disabled={!state.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default Place;
