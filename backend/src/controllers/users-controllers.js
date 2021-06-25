const HttpError = require("../models/http-error");
const User = require("../models/user-model");

const getUsers = async (req, res, next) => {
  try {
    // get All users without password field
    const users = await User.find({}, "-password");
    res.send({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    return next(new HttpError("Fetching users failed, Please try again later"));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError("Logging in failed , Please try later", 500));
  }

  if (!user || user.password !== password)
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
    places: [],
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
