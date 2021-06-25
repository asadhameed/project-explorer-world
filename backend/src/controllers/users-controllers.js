const { validationResult } = require("express-validator");
let DummyUser = require("../../fakeUser");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

const getUsers = (req, res, next) => {
  res.send({ user: DummyUser });
};

const login = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid Inputs data ,Please Check your inputs", 422)
  //   );
  // }
  const { email, password } = req.body;
  const user = DummyUser.find((u) => u.email === email);
  if (!user)
    return next(
      new HttpError("Couldn't identify user, seem wrong email or password", 401)
    );
  if (user.password !== password)
    return next(
      new HttpError("Couldn't identify user, seem wrong email or password", 401)
    );

  res.send("YOu are login");
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return next(new HttpError("User exists already, Please log in", 422));
    }
  } catch (error) {
    console.log(error);
    return next(new HttpError("Sign Up is failed , Please try later", 500));
  }

  const createUser = new User({
    name,
    email,
    password,
    image: "User Image",
    places: "Visited places",
  });
  try {
    await createUser.save();
    res.status(201).json({ user: createUser.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Sign Up is failed, Please try later", 500));
  }
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
