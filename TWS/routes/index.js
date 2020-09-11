const app = require("../app");

//check to see where we want "index" routes to be 
// - i.e. those coming off of the root path. 

const express = require("express");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const { asyncHandler, handleValidationErrors } = require("./utils/utils");
const { getUserToken, requireAuth, validateName, validateEmailAndPassword } = require("./utils/auth");
const db = require("../models");

const router = express.Router();
const { User, City } = db;

router.get("/sign-up", (async (req, res) => {
    const cities = await City.findAll({
        order: [["name", "ASC"]],
    })
    res.render("sign-up", { cities });
}));

router.get("/log-in", (req, res) => {
    res.render("log-in");
});

router.get("/", (req, res) => {
    res.redirect("/home");
})




module.exports = router;