import React, { useContext } from "react";
import "./PlacesList.css";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/formElements/Button";
import { AuthContext } from "../../shared/contexts/AuthContext";

const PlacesList = (props) => {
  const authContext = useContext(AuthContext);
  if (props.places.length === 0) {
    return (
      <div className="center ">
        <Card>
          <h2>No places found. May be create one?</h2>
          <Button to={authContext.isLoggedIn ? "/places/new" : "/auth"}>
            Share Places
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
};

export default PlacesList;
