const express = require("express");
const {asyncHandler} = require('./utils/utils');
const { Attendee, City, Event, User } = require('../models');
const router = express.Router();
const { csrfProtection } = require('./utils/utils');


router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await fetch(`http://localhost:8080/events/${id}`)
    const data = await result.json();
    console.log(data)

    res.render("event", { data })
  }))

router.get('/new', csrfProtection, async (req, res) => {
    const cities = await City.findAll({ order: ['name'] });
    res.render('new-event-form', { cities, csrfToken: req.csrfToken()});
  })

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
  //TODO update with current user when auth is complete
  const hostId = 10;
  
  const { cityId,
    date,
    time,
    venue,
    address,
    name,
    description,
    numOfGuests,
    limit } = req.body;
   
  const newEvent = await Event.create({ cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit })
}))

router.get('/', async (req, res) => {
    const events = await Event.findAll({ include: { model: City } });
    res.render('events', { events });
  });

  module.exports = router;
