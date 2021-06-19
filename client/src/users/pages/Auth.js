import React, { useState, useEffect } from "react";
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
  const [state, onInputHandler, setFormDate] = useForm();
  const onFromSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };
  const [isLogin, setLoginMode] = useState(true);
  const [inputRest, SetInputRest] = useState(false);

  const switchHandlerMode = () => {
    /****************************************************************
     *  When a user Switch from login page to SignUp the following
     * code isn't change the value of email and password it still
     * exist in the input value.
     *****************************************************************/
    // if (!isLogin) {
    //   setFormDate(
    //     {
    //       ...state.inputs,
    //       name: undefined,
    //     },
    //     state.inputs.email.isValid && state.inputs.password.isValid
    //   );
    // } else {
    //   setFormDate(
    //     {
    //       ...state.inputs,
    //       name: {
    //         value: "",
    //         isValid: false,
    //       },
    //     },
    //     false
    //   );
    // }
    console.log("come here---->");

    setLoginMode((prevMode) => !prevMode);
    setFormDate({}, false);
    SetInputRest(true);
  };
  useEffect(() => {
    SetInputRest(false);
  }, [isLogin]);

  return (
    <Card className="authentication">
      <h1>{isLogin ? "Login Required" : "User Sign Up"}</h1>
      <hr />
      <form onSubmit={onFromSubmit}>
        {!isLogin && (
          <Input
            id="name"
            label="Your Name"
            element="input"
            type="text"
            placeholder="User Name"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a name"
            onInput={onInputHandler}
            restInput={inputRest}
          />
        )}
        <Input
          id="email"
          label="Email"
          element="input"
          type="email"
          placeholder="Enter en email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please Enter a valid Email"
          onInput={onInputHandler}
          restInput={inputRest}
        />
        <Input
          id="password"
          element="input"
          label="Password"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at least 5 characters password"
          onInput={onInputHandler}
          restInput={inputRest}
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
