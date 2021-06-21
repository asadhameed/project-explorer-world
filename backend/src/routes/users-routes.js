const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/users-controllers");
const userValidator = require("../validators/user-validators");
const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post("/signup", userValidator.signUpValidator, usersControllers.signup);

router.post("/login", userValidator.loginValidator, usersControllers.login);

module.exports = router;
