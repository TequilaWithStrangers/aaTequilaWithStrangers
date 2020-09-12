const express = require("express");
const { asyncHandler, handleValidationErrors } = require('./utils/utils');

const { Event } = require('../models');
const router = express.Router();
const { csrfProtection } = require('./utils/utils');
const { requireAuth, validateCreateEvent } = require("./utils/auth");

router.use(requireAuth);


router.post('/events', csrfProtection, validateCreateEvent, handleValidationErrors, asyncHandler(async (req, res) => {
    console.log('beginning');
    //TODO update with current user when auth is complete


    // if (!hostId) {
    //     alert('OOPSIES!!!!!!');
    // };

    const { cityId,
        date,
        time,
        venue,
        hostId,
        address,
        name,
        description,
        numOfGuests,
        limit } = req.body;

    console.log('before')
    const newEvent = await Event.create({ cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit })
    console.log('after');
    res.redirect('/home');
}))

module.exports = router;
