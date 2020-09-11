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
  console.log(host)
  // const host = await User.findByPk(hostId)
  res.render('event', { event, host })
}));

router.post('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const { userId, eventId } = req.body;
  try {
    await Attendee.create({ userId, eventId, createdAt: new Date(), updatedAt: new Date() });
  } catch (err) {
    res.render('error', err)
  }
  const event = await Event.findByPk(eventId);
  const num = event.numOfGuests + 1
  await Event.update({ numOfGuests: num })
  res.render('dashboard')
}))

router.get('/new', csrfProtection, async (req, res) => {
  const cities = await City.findAll({ order: ['name'] });
  res.render('new-event-form', { cities, csrfToken: req.csrfToken() });
})

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
  console.log('beginning');
  //TODO update with current user when auth is complete
  

  if (!hostId) {
    alert('OOPSIES!!!!!!');
  };

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

router.get('/', async (req, res) => {
  const events = await Event.findAll({ include: { model: City } });
  res.render('events', { events });
});

module.exports = router;
