const express = require("express");
const { asyncHandler, handleValidationErrors } = require('./utils/utils');

const { Event } = require('../models');
const router = express.Router();
const { csrfProtection } = require('./utils/utils');
const { requireAuth, validateCreateEvent } = require("./utils/auth");

router.use(requireAuth);

//route for creating a new event
router.post('/events', csrfProtection, validateCreateEvent, handleValidationErrors, asyncHandler(async (req, res) => {

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

    const newEvent = await Event.create({ cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit })
    res.redirect('/home');
}))

//router for updating event
router.put('/update/:id(\\d+)',
    csrfProtection,
    validateCreateEvent,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const { cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit, _csrf, thisEvent } = req.body;

        const event = await Event.findByPk(thisEvent)
        const updatedEvent = await event.update({
            cityId,
            date,
            time,
            venue,
            address,
            name,
            description,
            hostId,
            numOfGuests,
            limit,
            _csrf
        })

        res.json(updatedEvent)
    }));


module.exports = router;
