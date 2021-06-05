import React from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";

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
const UserPlaces = (props) => {
  const { userId } = useParams();
  const newPlace = placeList.filter((place) => place.creator === userId);

  return (
    <div>
      <PlacesList places={newPlace} />
    </div>
  );
};

export default UserPlaces;
