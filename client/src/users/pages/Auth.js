import React, { useState } from "react";
import "./Auth.css";
import Input from "../../shared/components/formElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form_hook";
import Button from "../../shared/components/formElements/Button";
const Auth = () => {
  const [state, onInputHandler] = useForm();
  const onFromSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };
  const [isLogin, setLoginMode] = useState(true);
  const switchHandlerMode = () => {
    setLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      <h1>{isLogin ? "Login Required" : "User Sign Up"}</h1>
      <hr />
      <form onSubmit={onFromSubmit}>
        <Input
          id="email"
          label="Email"
          element="input"
          type="email"
          placeholder="Enter en email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please Enter a valid Email"
          onInput={onInputHandler}
        />
        <Input
          id="Password"
          element="input"
          label="Password"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at least 5 characters password"
          onInput={onInputHandler}
        />
        <Button type="submit" disabled={!state.isValid}>
          {isLogin ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchHandlerMode}>
        SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
