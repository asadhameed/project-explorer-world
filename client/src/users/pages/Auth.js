import React, { useState, useEffect, useContext } from "react";
import "./Auth.css";
import Input from "../../shared/components/formElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form_hook";
import Button from "../../shared/components/formElements/Button";
import { AuthContext } from "../../shared/contexts/AuthContext";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = () => {
  const [state, onInputHandler, setFormDate] = useForm();
  const [isLogin, setLoginMode] = useState(true);
  const [inputRest, SetInputRest] = useState(false);
  // const [isSpinnerActive, setSpinnerActive] = useState(false);
  // const [error, setError] = useState();
  const { isSpinnerActive, httpError, sendRequest, clearError } =
    useHttpClient();
  const authContext = useContext(AuthContext);

  /*****************************************
   * Convert into http-hook.js
   ********************************************/

  // const fetchLogInOrSignUp = async (method, body) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/users/${method}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "Application/json",
  //         },
  //         body,
  //       }
  //     );

  //     console.log(response);
  //     const responseDate = await response.json();
  //     if (!response.ok) {
  //       throw new Error(responseDate.message);
  //     }
  //     setSpinnerActive(false);
  //     authContext.login();
  //   } catch (error) {
  //     setSpinnerActive(false);
  //     setError(error.message || "Something went wrong, Please try again");
  //   }
  // };

  const onFromSubmit = async (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "Application/json",
    };
    const method = "POST";
    //setSpinnerActive(true);
    if (isLogin) {
      const body = JSON.stringify({
        email: state.inputs.email.value,
        password: state.inputs.password.value,
      });
      //  fetchLogInOrSignUp("login", body);
      const data = await sendRequest(
        `http://localhost:5000/api/users/login`,
        method,
        body,
        headers
      );
      if (data) authContext.login();
    } else {
      const body = JSON.stringify({
        name: state.inputs.name.value,
        password: state.inputs.password.value,
        email: state.inputs.email.value,
      });
      const data = await sendRequest(
        `http://localhost:5000/api/users/signup`,
        method,
        body,
        headers
      );
      if (data) authContext.login();
      //   fetchLogInOrSignUp("signup", body);
    }
  };

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

    setLoginMode((prevMode) => !prevMode);
    setFormDate({}, false);
    SetInputRest(true);
  };
  useEffect(() => {
    SetInputRest(false);
  }, [isLogin]);

  return (
    <>
      <ErrorModal error={httpError} onClear={clearError} />
      <Card className="authentication">
        <h1>{isLogin ? "Login Required" : "User Sign Up"}</h1>
        {isSpinnerActive && <Spinner asOverlay />}
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter at least 6 characters password"
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
    </>
  );
};

export default Auth;
