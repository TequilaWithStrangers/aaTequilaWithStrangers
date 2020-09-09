const express = require("express");
const {asyncHandler} = require('./utils/utils');

const router = express.Router();


router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await fetch(`http://localhost:8080/events/${id}`)
    const data = await result.json();
    console.log(data)

    res.render("event", { data })
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
