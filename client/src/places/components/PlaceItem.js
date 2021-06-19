import React, { useState, useContext } from "react";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/formElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/contexts/AuthContext";
const PlaceItem = (props) => {
  const { title, image, address, description } = props.place;
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const authContext = useContext(AuthContext);

  const onOpenHandler = () => setShowMap(true);
  const onCloseHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setShowDeleteModal(true);
  const cancelDeleteHandler = () => setShowDeleteModal(false);
  const confirmDeleteHandler = () => {
    console.log("Delete the place");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={onCloseHandler}
        header={title}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions "}
        footer={<Button onClick={onCloseHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={cancelDeleteHandler}
        header={"Are You sure to delete Place?"}
        footerClass={"place-item__modal-action"}
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete the place? </p>
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
            {authContext.isLoggedIn && (
              <Button to={`/place/${props.place.id}`}>Edit</Button>
            )}

            {authContext.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
