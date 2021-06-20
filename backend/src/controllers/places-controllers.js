let dummyPlaces = require("../../fakePlace");
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

const createPlace = (req, res, next) => {
  const body = req.body;
  dummyPlaces.push(body);
  res.json({ message: "Create A new User" });
};

const updatePlaceById = (req, res, next) => {
  const { pid } = req.params;
  const { title, description } = req.body;
  const place = dummyPlaces.find((p) => p.id === pid);
  if (!place) throw new HttpError("Bad Request", 404);
  place.title = title;
  place.description = description;
  res.send("Update the resource");
};

const deletePlaceById = (req, res, next) => {
  const { pid } = req.params;
  const place = dummyPlaces.find((p) => p.id === pid);
  dummyPlaces = dummyPlaces.filter((p) => p.id !== pid);
  if (!place) {
    throw new HttpError("Bad Request", 404);
  }
  res.json({ message: "Delete the resource" });
};

//// First Method
// module.exports = { getPlaceById, getPlaceByUserId };

//Second
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;
