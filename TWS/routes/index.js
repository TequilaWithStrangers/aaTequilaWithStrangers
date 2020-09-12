const app = require("../app");

//check to see where we want "index" routes to be
// - i.e. those coming off of the root path.

const express = require("express");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const { csrfProtection } = require('./utils/utils');

const { asyncHandler, handleValidationErrors } = require("./utils/utils");
const db = require("../models");

const router = express.Router();
const { User, City } = db;

router.get("/sign-up", csrfProtection, (async (req, res) => {
    const cities = await City.findAll({
        order: [["name", "ASC"]],
    })
    res.render("sign-up", { cities, csrfToken: req.csrfToken() });
}));

router.get("/log-in", csrfProtection, (req, res) => {
    res.render("log-in", { csrfToken: req.csrfToken() });
});
router.get('/home', (req, res) => {
    res.render('landing-page');
})

router.get("/", (req, res) => {
    res.redirect("/home");
})




module.exports = router;
