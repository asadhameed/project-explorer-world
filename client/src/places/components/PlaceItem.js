import React, { useState } from "react";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/formElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
const PlaceItem = (props) => {
  const { title, image, address, description } = props.place;
  const [showMap, setShowMap] = useState(false);

  const onOpenHandler = () => setShowMap(true);
  const onCloseHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={onCloseHandler}
        header={address}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions "}
        footer={<Button onClick={onCloseHandler}>Close</Button>}
      >
        <div className="map-container">
          <h2>The map</h2>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__imag">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={onOpenHandler}>
              View on Map
            </Button>
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
