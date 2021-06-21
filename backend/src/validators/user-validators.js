const { check, validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
/*******************************************************
 * How can just validate in one function
 *******************************************************/
// const loginValidator = [
//   check("email").isEmail().withMessage("Email is not Valid"),
//   (req, res, next) => {
//     const error = validationResult(req);
//     console.log(error);
//     if (!error.isEmpty()) {
//       return res.status(402).json("The email is not valid");
//     }
//     next();
//   },
// ];

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, Please check your data", 422);
  }
  next();
};
const emailValidate = check("email")
  .normalizeEmail()
  .isEmail()
  .withMessage("Email is not Valid");

const nameValidate = check("name").trim().isLength({ min: 3 });
const passwordValidate = check("password").trim().isLength({ min: 6 });

const signUpValidator = [
  emailValidate,
  passwordValidate,
  nameValidate,
  errorHandler,
];
const loginValidator = [emailValidate, errorHandler];

exports.loginValidator = loginValidator;
exports.signUpValidator = signUpValidator;
