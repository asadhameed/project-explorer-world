const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const userValidator = require("../validators/user-validators");

const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  userValidator.signUpValidator,
  usersControllers.signup
);

router.post("/login", userValidator.loginValidator, usersControllers.login);

module.exports = router;
