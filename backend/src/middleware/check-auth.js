const jwt = require("jsonwebtoken");
const Place = require("../models/place-model");
const HttpError = require("../models/http-error");

const authentication = async (req, res, next) => {
  // The browser first send OPTIONS METHOD...
  // If you remove this line then code give error
  if (req.method === "OPTIONS") return next();
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new HttpError("Forbidden", 403));
    const decode = jwt.verify(token, "myPrivateKey");
    req.userData = { userId: decode.userId };
    return next();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Forbidden", 403));
  }
};

const authorization = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const place = await Place.findById(pid);
    /*************************************************************
     * place.creator is object  and req.userData.userId is String
     * If place.creator and req.userData.userId have the same value
     * If remove toString function from place.creator
     * the if statement will be true and give Error
     * So object should convert to string for successful result.
     *************************************************************/
    console.log(place);
    if (place.creator.toString() !== req.userData.userId)
      return next(new HttpError("Forbidden", 401));

    return next();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Unauthorized", 401));
  }
};
exports.authorization = authorization;
exports.authentication = authentication;
