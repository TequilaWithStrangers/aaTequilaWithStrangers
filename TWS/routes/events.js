const express = require("express");
const { asyncHandler } = require('./utils/utils');

const { Attendee, City, Event, User } = require('../models');
const router = express.Router();
const { csrfProtection } = require('./utils/utils');

//route to specific events
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

  res.render('event', { event, host });
}));

//join button route for specific events
router.post('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { userId, eventId } = req.body;
  
  //if user is not logged in
  if(!userId) {
    res.render('log-in');
  }
  const isThere = await Attendee.findOne({
    attributes: ['id'],
    where: { userId, eventId }
  });
  // if the user is not signed up for the event yet
  if (!isThere){
  await Attendee.create({userId: userId, eventId: eventId, createdAt: new Date(), updatedAt: new Date()});

  const event = await Event.findByPk(eventId);
  const num = event.numOfGuests + 1;
  await event.update({ numOfGuests: num });
  }
  const attending = await Attendee.findAll({
    attributes: ["eventId"],
    where: { userId },
    include: { model: Event, as: 'event'}
  });
  //events are in attending.events as an array
  res.render('dashboard', {attending});
}));


//join or leave button query
router.get('/who-is-logged/:id(\\d+)/\\d+', asyncHandler(async(res, req, next)=>{
  const userId = req.params.id;
  const eventId = whatEvent();
  console.log('HERRRRRREEEE!!!!!!', eventId)
  const isAttending = await Attendee.findAll({
    attributes: ['id'],
    where: {userId, eventId}
  })
  console.log(isAttending)
  
  res.json(isAttending)
}));



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

router.get('/', asyncHandler(async (req, res) => {
  const events = await Event.findAll({ include: { model: City } });
  res.render('events', { events });
}));


function whatEvent() {
  let index;
  for (let i = window.location.href.length -1; i > 0; i --) {
      if (window.location.href[i] === '/') {
          
          return window.location.href.slice(i + 1)
      }
  }
}

module.exports = router;
