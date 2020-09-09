const express = require('express');
const { check, validationResult } = require('express-validator');
const { Event, City } = require('./models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/cities', csrfProtection, asyncHandler(async (req, res) => {
    const cities = await City.findAll({ order: ['name'] });
    res.json(cities)
}));

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
