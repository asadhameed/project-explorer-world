import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
const UserPlaces = (props) => {
  const { userId } = useParams();
  const [userPlaces, setUserPlaces] = useState([]);
  const { isSpinnerActive, sendRequest } = useHttpClient();
  useEffect(() => {
    const getUserPlaces = async () => {
      const data = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `api/places/user/${userId}`
      );
      if (data) setUserPlaces(data.places);
      else setUserPlaces([]);
    };

    getUserPlaces();
  }, [sendRequest, userId]);
  const onDeleteHandler = (placeId) => {
    setUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== placeId)
    );
    //setUserPlaces(userPlaces.filter((place) => place.id !== placeId));
  };
  return (
    <>
      <div>
        {isSpinnerActive && (
          <div className="center">
            <Spinner asOverlay />
          </div>
        )}
        {!isSpinnerActive && (
          <PlacesList places={userPlaces} onDeletePlace={onDeleteHandler} />
        )}
      </div>
    </>
  );
};

export default UserPlaces;
