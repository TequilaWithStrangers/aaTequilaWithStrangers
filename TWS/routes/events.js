const express = require("express");
const { asyncHandler } = require('./utils/utils');
const { Event, City, User, Attendee } = require('../models')

const router = express.Router();


router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
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

router.post('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const {userId, eventId} = req.body;
  try{
    await Attendee.create({userId, eventId, createdAt: new Date(), updatedAt: new Date()});
  }catch(err){
    res.render('error', err)
  }  
  res.render('dashboard')
}))

router.get('/new', async (req, res) => {
    const response = await fetch('http://localhost:8080/cities');
    const cities = response.json();
    res.render('new-event-form', { cities });
})

router.get('/', async (req, res) => {
    let response = await fetch('/api/events');
    let events = await response.json();
    res.render('events', { events });
});

  module.exports = router;
