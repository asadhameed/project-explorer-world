const express = require("express");

const fileUpload = require("../middleware/file-upload");
const checkAuthToken = require("../middleware/check-auth");
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

/**********************************************************************
 * If called middleware function
 * then the upper router will not effected but the down router will
 * go through this middleware function
 **********************************************************************/

router.use(checkAuthToken);

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
