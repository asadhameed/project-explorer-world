const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

const generateToken = async (user) => {
  let token;
  try {
    token = await jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return token;
  } catch (error) {
    throw error;
  }
};

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
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return next(
        new HttpError(
          "Couldn't identify user, seem wrong email or password",
          401
        )
      );
    const token = await generateToken(user);
    res.json({ userId: user._id, email: user.email, token });
  } catch (error) {
    return next(new HttpError("Logging in failed , Please try later", 500));
  }

  //  res.json({ message: "You are login" });
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
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return next(new HttpError("Sign Up is failed, Please try later", 500));
  }

  const createUser = new User({
    name,
    email,
    password: hashPassword,
    image: req.file.path,
    places: [],
  });
  try {
    await createUser.save();
    const token = await generateToken(createUser);
    res.json({ userId: createUser._id, email: createUser.email, token });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Sign Up is failed, Please try later", 500));
  }
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
