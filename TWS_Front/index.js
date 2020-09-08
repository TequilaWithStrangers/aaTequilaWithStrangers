const express = require("express");
const path = require("path");
const fetch = require('node-fetch');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Define a route.
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/log-in", (req, res) => {
  res.render("log-in");
});

app.get('/events', async (req,res)=>{
  let response = await fetch('http://localhost:8080/events');
  let events = await response.json();
  res.render('events',{events});
});

// Define a port and start listening for connections.
const port = 4000;

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
