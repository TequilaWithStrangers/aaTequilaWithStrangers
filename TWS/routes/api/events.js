const express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('../utils/utils');
const eventsRouter = express.Router();
const { Event, User, City } = require('../../models')


eventsRouter.get('/', async (req, res) => {
    const events = await Event.findAll({ include: { model: City } });
    res.json(events);
})

eventsRouter.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const event = await Event.findOne({
        where: { id },
        include: { model: City },
    });

    const host = await User.findByPk(event.hostId)
    console.log(host)
    // const host = await User.findByPk(hostId)
    res.json({ event, host })
}));

module.exports = eventsRouter;
