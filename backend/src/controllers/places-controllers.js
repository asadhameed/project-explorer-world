let dummyPlaces = require("../../fakePlace");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place-model");

const getPlaceById = async (req, res, next) => {
  const { pid } = req.params;

  //const place = dummyPlaces.find((p) => p.id === pid);
  let place;
  try {
    place = await Place.findById(pid);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, couldn't find place", 500)
    );
  }

  if (!place) {
    return next(
      new HttpError("couldn't find a place for the provide place id", 404)
    );
  }
  return res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const { uid } = req.params;
  let userPlaces;

  try {
    userPlaces = await Place.find({ creator: uid });
  } catch (error) {
    return next(
      new HttpError("Fetching places failed, please try again later", 500)
    );
  }

  if (!userPlaces || userPlaces.length === 0) {
    throw new HttpError("couldn't find a place for the provide user id", 404);
  }
  res.json({
    userPlaces: userPlaces.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator } = req.body;
  const location = await getCoordsForAddress(address);
  try {
    const createPlace = new Place({
      title,
      description,
      address,
      location,
      image: "Temp image",
      creator,
    });
    await createPlace.save();
    res.json({ message: createPlace });
  } catch (error) {
    /*************************************
     *
     * throw new HttpError("Creating place failed, Please try again later", 500)
     *  The upper line will not send error to client and application will crash.
     * if you want to send error to client then use return next( new HttpError("Creating place failed, Please try again later", 500))
     */
    console.log(error);
    return next(
      new HttpError("Creating place failed, Please try again later", 500)
    );
  }
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
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;
