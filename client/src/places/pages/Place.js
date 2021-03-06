import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Place.css";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import ImageUpload from "../../shared/components/formElements/ImageUpload";

import { useForm } from "../../shared/hooks/form_hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/contexts/AuthContext";
const Place = () => {
  const [state, onInputHandler] = useForm();
  const { isSpinnerActive, httpError, sendRequest, clearError } =
    useHttpClient();
  const { token } = useContext(AuthContext);
  const routeHistory = useHistory();
  const [imageError, setImageError] = useState(null);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formDate = new FormData();
      formDate.append("title", state.inputs.title.value);
      formDate.append("description", state.inputs.description.value);
      formDate.append("address", state.inputs.address.value);
      formDate.append("image", state.inputs.image.value);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "api/places/",
        "POST",
        // JSON.stringify({
        //   title: state.inputs.title.value,
        //   description: state.inputs.description.value,
        //   address: state.inputs.address.value,
        //   creator: userId,
        // }),
        formDate,
        headers
        // {
        //   "Content-Type": "Application/json",
        // }
      );

      if (data) {
        routeHistory.push("/");
      }
    } catch (error) {
      setImageError(
        "Data is missing, Please check your input data. May be you don't provide a place image"
      );
    }
  };

  return (
    <>
      <ErrorModal error={httpError} onClear={clearError} />
      <ErrorModal error={imageError} onClear={() => setImageError(null)} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isSpinnerActive && <Spinner asOverlay />}
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
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="PLease Enter a valid description (at least 10 characters)"
          onInput={onInputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          errorText="PLease Enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={onInputHandler}
        />
        <ImageUpload center="center" id="image" onInput={onInputHandler} />
        <Button type="submit" disabled={!state.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default Place;
