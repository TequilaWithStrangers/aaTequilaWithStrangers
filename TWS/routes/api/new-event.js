const express = require('express');
const { check, validationResult } = require('express-validator');
const { Event, City } = require('./models');

const { csrfProtection, asyncHandler } = require('../utils/utils');

const router = express.Router();



router.post('/events', csrfProtection, asyncHandler(async (req, res) => {
    const { cityId,
        date,
        time,
        venue,
        address,
        name,
        description,
        hostId,
        numOfGuests,
        limit } = req.body;

    const newEvent = await Event.create({ cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit })

    res.json(newEvent)
}))
