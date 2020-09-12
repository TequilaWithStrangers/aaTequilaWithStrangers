const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config");
const { User } = require("../../models");
const bearerToken = require("express-bearer-token");
const { check } = require("express-validator");

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  console.log(user.id, user.email);
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // Create the token.
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );
  console.log(token);
  return token;
};

const restoreUser = (req, res, next) => {
  // token being parsed from request header by the bearerToken middleware
  // function in app.js:
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      // Send a "401 Unauthorized" response status code
      // along with an "WWW-Authenticate" header value of "Bearer".
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

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

const validateCreateEvent = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an event name."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an event description."),
  check("venue")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a venue name."),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an address."),
  check("limit")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an attendee limit."),
  check("date")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an event date."),
  check("time")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an event time."),
  check("cityId")
    .exists({ checkFalsy: true })
    .withMessage("Please select a city."),
]

const requireAuth = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth, validateName, validateEmailAndPassword, validateCreateEvent };
