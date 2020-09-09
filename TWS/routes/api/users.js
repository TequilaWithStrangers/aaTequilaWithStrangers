const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils/utils");
const { getUserToken, requireAuth } = require("../utils/auth");
const router = express.Router();
const db = require("../../models");

const { User } = db;

const validateName = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name."),
  check("firstName")
    .isLength({ max: 50 })
    .withMessage("First name cannot be longer than 50 characters."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name."),
  check("lastName")
    .isLength({ max: 50 })
    .withMessage("Last name cannot be longer than 50 characters."),
];

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

router.post(
  "/",
  validateName,
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, cityId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, hashedPassword, cityId });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  }));

// router.post(
//   "/token",
//   validateEmailAndPassword,
//   asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (!user || !user.validatePassword(password)) {
//       const err = new Error("Login failed");
//       err.status = 401;
//       err.title = "Login failed";
//       err.errors = ["The provided credentials were invalid."];
//       return next(err);
//     }
//     const token = getUserToken(user);
//     res.json({ token, user: { id: user.id } });
//   })
// );

// router.get(
//   "/:id/tweets",
//   requireAuth,
//   asyncHandler(async (req, res, next) => {
//     const tweets = await Tweet.findAll({
//       where: {
//         userId: req.params.id,
//       },
//     });
//     res.json({ tweets });
//   })
// );

module.exports = router;
