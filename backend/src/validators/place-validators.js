const { check, validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const validationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, Please check your data", 422);
  }
  next();
};

const validateTitle = check("title").trim().not().isEmpty();
const validateDescription = check("description").trim().isLength({ min: 10 });
const validateAddress = check("address").not().isEmpty();

const createPlaceValidator = [
  validateTitle,
  validateDescription,
  validateAddress,
  validationError,
];

const updatePlaceValidator = [
  validateTitle,
  validateDescription,
  validationError,
];

exports.createPlaceValidator = createPlaceValidator;
exports.updatePlaceValidator = updatePlaceValidator;
