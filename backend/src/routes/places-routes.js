const express = require("express");

const dummyPlaces = require("../../fakePlace");

const router = express.Router();

router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const place = dummyPlaces.find((p) => p.id === pid);
  if (place) return res.json({ place });
  return res.json({ Message: "No place" });
});

router.get("/user/:uid", (req, res) => {
  const { uid } = req.params;
  const userPlace = dummyPlaces.find((p) => p.creator === uid);
  res.json({ userPlace });
});

module.exports = router;
