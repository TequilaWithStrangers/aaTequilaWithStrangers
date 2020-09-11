const express = require("express");
const { asyncHandler } = require('./utils/utils');

const { Attendee, City, Event, User } = require('../models');
const router = express.Router();
const { csrfProtection } = require('./utils/utils');


router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const event = await Event.findOne({
    where: { id },
    include: { model: City },
  });
  const host = await User.findOne({
    where: { id: event.hostId },
    include: { model: City },
  })
  res.render('event', { event, host })
}));

router.post('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { userId, eventId } = req.body;
  const isThere = await Attendee.findOne({
    attributes: ['id'],
    where: { userId, eventId }
  })
  console.log(isThere)
  if (!isThere){
  await Attendee.create({userId: userId, eventId: eventId, createdAt: new Date(), updatedAt: new Date()});

  const event = await Event.findByPk(eventId);
  const num = event.numOfGuests + 1
  await event.update({ numOfGuests: num })
  }
  const events = await Event.findAll({ include: { model: City } });
  res.render('events', {events})
}))

router.get('/new', csrfProtection, async (req, res) => {
  const cities = await City.findAll({ order: ['name'] });
  res.render('new-event-form', { cities, csrfToken: req.csrfToken() });
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
