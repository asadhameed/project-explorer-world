import React from "react";
import { useParams } from "react-router";
import "./Place.css";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

const placeList = [
  {
    id: "p1",
    title: "Peshawar City",
    description: "This is the famous city in pakistan you can visit this place",
    image:
      "https://cdn.britannica.com/05/45505-004-ABC0C282/Mahabat-Khan-Mosque-Peshawar-Pak.jpg",
    creator: "u2",
  },
  {
    id: "p2",
    title: "Peshawar City",
    description: "This is the famous city in pakistan you can visit this place",
    image:
      "https://qph.fs.quoracdn.net/main-qimg-cb61980195fa1f30767cab9e2e5193f9",
    creator: "u2",
  },
  {
    id: "p3",
    title: "Peshawar City",
    description: "This is the famous city in pakistan you can visit this place",
    image:
      "https://qph.fs.quoracdn.net/main-qimg-cb61980195fa1f30767cab9e2e5193f9",
    creator: "u1",
  },
];

const PlaceUpdate = () => {
  const { placeId } = useParams();

  const place = placeList.find((place) => place.id === placeId);
  console.log(place);
  const inputHandler = () => {
    console.log(placeId);
  };
  if (!place) {
    return (
      <div className="center">
        <h2>Place couldn't find</h2>
      </div>
    );
  }
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        label="Title"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title"
        onInput={inputHandler}
        value={place.title}
        isValid={true}
      />
      <Input
        id="description"
        element="textArea"
        label="Description"
        type="text"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter a valid description (At least 5 characters)"
        onInput={inputHandler}
        value={place.description}
        isValid={true}
      />
      <Button type="submit" disabled={true}>
        Update Place
      </Button>
    </form>
  );
};

export default PlaceUpdate;
