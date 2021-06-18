import React, { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case "TO_TOUCH":
      return { ...state, isTouch: action.payload };
    default:
      return state;
  }
};

const Input = (props) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouch: false,
    isValid: props.initialValid || false,
  });
  const { id, onInput } = props;
  const { value, isValid } = state;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      payload: event.target.value,
      validators: props.validators,
      isTouch: false,
    });
  };
  const touchHandler = () => {
    dispatch({ type: "TO_TOUCH", payload: true });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={state.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={state.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div
      className={`form-control ${
        !state.isValid && state.isTouch && "form-control--invalid"
      } `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!state.isValid && state.isTouch && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
