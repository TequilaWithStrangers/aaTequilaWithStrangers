const express = require("express");
const path = require("path");
const fetch = require('node-fetch');

const asynHandler = (handle) => (req, res, next) => handle(req, res, next).catch(next);

// Create the Express app.
const router = express.Router();


// Set the pug view engine.
//router.set("view engine", "pug");
router.use(express.static(path.join(__dirname, "public")));

// Define a route.
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/events/:id(\\d+)", asynHandler(async (req, res) => {
  const id = parseInt(req.params.id)
  const result = await fetch(`http://localhost:8080/events/${id}`)
  const data = await result.json();
  console.log(data)

  res.render("event", { data })
}))

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.get("/log-in", (req, res) => {
  res.render("log-in");
});


router.get('/events/new', async (req, res) => {
  const response = await fetch('http://localhost:8080/cities');
  const cities = response.json();
  res.render('new-event-form', { cities });
})

router.get('/events', async (req, res) => {
  let response = await fetch('/api/events');
  let events = await response.json();
  res.render('events', { events });
});

module.exports = router;