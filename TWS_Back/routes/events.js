const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../models');
const { csrfProtection, asyncHandler } = require('./utils');
const eventsRouter = express.Router();

const { Event, City } = require('../models');

eventsRouter.get('/', async (req,res) =>{
    const events = await Event.findAll({include:{model:City}});
    res.json(events);
})


eventsRouter.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
    const id = parseInt(req.params.id);
    const event = await Event.findByPk(id);
    console.log(req.params.id)
    res.json(event)
}));




module.exports = eventsRouter;
