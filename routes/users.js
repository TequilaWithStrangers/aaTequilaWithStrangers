const express = require("express");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const { asyncHandler, handleValidationErrors } = require("./utils/utils");
const { getUserToken, requireAuth, validateName, validateEmailAndPassword } = require("./utils/auth");
const db = require("../models");

const router = express.Router();
const { User } = db;

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
        //redirect
    }));

router.post(
    "/token",
    validateEmailAndPassword,
    asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user || !user.validatePassword(password)) {
            const err = new Error("Login failed");
            err.status = 401;
            err.title = "Login failed";
            err.errors = ["The provided credentials were invalid."];
            return next(err);
        }
        const token = getUserToken(user);
        res.json({ token, user: { id: user.id } });
    })
);

module.exports = router;