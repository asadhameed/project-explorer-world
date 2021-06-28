const express = require("express");

const fileUpload = require("../middleware/file-upload");

const placeValidators = require("../validators/place-validators");
//// First Method
// const {
//   getPlaceById,
//   getPlaceByUserId,
// } = require("../controllers/places-controllers");

// Second Method
const placeControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.post(
  "/",
  fileUpload.single("image"),
  placeValidators.createPlaceValidator,
  placeControllers.createPlace
);

router.patch(
  "/:pid",
  placeValidators.updatePlaceValidator,
  placeControllers.updatePlaceById
);

router.delete("/:pid", placeControllers.deletePlaceById);

module.exports = router;
