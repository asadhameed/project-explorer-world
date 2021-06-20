const express = require("express");

const dummyPlaces = require("../../fakePlace");

const router = express.Router();

router.get("/:pid", (req, res, next) => {
  const { pid } = req.params;
  const place = dummyPlaces.find((p) => p.id === pid);
  if (!place) {
    return next({
      code: 404,
      message: "couldn't find a place for the provide place id",
    });
  }
  return res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const { uid } = req.params;
  const userPlace = dummyPlaces.find((p) => p.creator === uid);
  if (!userPlace) {
    // return res
    //   .status(404)
    //   .json({ message: "couldn't find a place for the provide user id" });
    const error = new Error("couldn't find a place for the provide user id");
    error.code = 404;
    throw error;
  }
  res.json({ userPlace });
});

module.exports = router;
