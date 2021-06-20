let DummyUser = require("../../fakeUser");
const HttpError = require("../models/http-error");

const getUsers = (req, res, next) => {
  res.send({ user: DummyUser });
};

const login = (req, res, next) => {
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

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const user = DummyUser.find((u) => u.email === email);
  if (user)
    return next(
      new HttpError("Couldn't create user, Email already in use", 401)
    );
  const createUser = {
    id: Math.random().toString(),
    name,
    email,
    password,
  };

  DummyUser.push(createUser);
  res.status(201).json({ user: createUser });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
