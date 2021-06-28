import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

import "./Place.css";

import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form_hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/contexts/AuthContext";
const PlaceUpdate = () => {
  const [state, onInputHandler, setFormDate] = useForm(false, {
    title: { value: "", isValid: false },
    description: { value: "", isValid: false },
  });
  const [place, setPlace] = useState(null);

  const routeHistory = useHistory();
  const authContext = useContext(AuthContext);
  const { isSpinnerActive, httpError, sendRequest } = useHttpClient();

  const { placeId } = useParams();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("token-------->", authContext.token);

    const data = await sendRequest(
      `http://localhost:5000/api/places/${placeId}`,
      "PATCH",
      JSON.stringify({
        title: state.inputs.title.value,
        description: state.inputs.description.value,
      }),
      {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${authContext.token}`,
      }
    );
    if (data) {
      routeHistory.push(`/${authContext.userId}/places`);
    }
  };
  useEffect(() => {
    const getPlace = async () => {
      const data = await sendRequest(
        `http://localhost:5000/api/places/${placeId}`
      );
      if (data) {
        if (data.place) {
          setPlace(data.place);
          const inputs = {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          };
          setFormDate(inputs, true);
        }
      }
    };
    getPlace();
  }, [sendRequest, placeId, setFormDate]);

  // useEffect(() => {

  // }, [place, setFormDate]);

  /*********
   * If We not useEffect:- this error will come 'Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
   *
   */
  // const inputs = {
  //   title: {
  //     value: place.title,
  //     isValid: true,
  //   },
  //   description: {
  //     value: place.description,
  //     isValid: true,
  //   },
  // };
  // setFormDate(inputs, true);
  if (isSpinnerActive) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }
  if (!place && !httpError) {
    return (
      <div className="center">
        <Card>
          <h2>Place couldn't find</h2>
        </Card>
      </div>
    );
  }

  // console.log("Place Update Page is running", state);
  return (
    <>
      {!isSpinnerActive && place && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            label="Title"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid Title"
            onInput={onInputHandler}
            initialValue={place.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textArea"
            label="Description"
            type="text"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please Enter a valid description (At least 10 characters)"
            onInput={onInputHandler}
            initialValue={place.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!state.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};

export default PlaceUpdate;
