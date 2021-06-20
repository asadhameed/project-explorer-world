const express = require("express");
//// First Method
// const {
//   getPlaceById,
//   getPlaceByUserId,
// } = require("../controllers/places-controllers");

// Second Method
const placeControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlaceByUserId);

module.exports = router;
