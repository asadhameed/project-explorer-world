import React, { useCallback, useReducer } from "react";
import "./Place.css";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

const fromReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      if (!state.inputs) formIsValid = false;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Place = () => {
  const [state, dispatch] = useReducer(fromReducer, {
    isValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
  }, []);
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
