const dummyPlaces = require("../../fakePlace");
const HttpError = require("../models/http-error");

const getPlaceById = (req, res, next) => {
  const { pid } = req.params;
  const place = dummyPlaces.find((p) => p.id === pid);
  if (!place) {
    return next(
      new HttpError("couldn't find a place for the provide place id", 404)
    );
  }
  return res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const { uid } = req.params;
  const userPlace = dummyPlaces.find((p) => p.creator === uid);
  if (!userPlace) {
    throw new HttpError("couldn't find a place for the provide user id", 404);
  }
  res.json({ userPlace });
};
//// First Method
// module.exports = { getPlaceById, getPlaceByUserId };

//Second
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
