const express = require("express");

const dummyPlaces = require("../../fakePlace");

const router = express.Router();

router.get("/:placeId", (req, res) => {
  const { placeId } = req.params;
  const place = dummyPlaces.find((p) => p.id === placeId);
  if (place) return res.json({ place });
  return res.json({ Message: "No place" });
});

module.exports = router;
