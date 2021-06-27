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
        `http://localhost:5000/api/places/user/${userId}`
      );
      console.log(data);
      if (data) setUserPlaces(data.places);
      else setUserPlaces([]);
    };

    getUserPlaces();
  }, [sendRequest, userId]);

  return (
    <>
      <div>
        {isSpinnerActive && (
          <div className="center">
            <Spinner asOverlay />
          </div>
        )}
        {!isSpinnerActive && <PlacesList places={userPlaces} />}
      </div>
    </>
  );
};

export default UserPlaces;
