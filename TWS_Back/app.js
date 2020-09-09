const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
<<<<<<< HEAD
// const tweetsRouter = require("./routes/tweets");
=======

>>>>>>> master
const usersRouter = require("./routes/users");
const { environment } = require("./config");
const eventsRouter = require("./routes/Events")



const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000" }));

app.use("/", indexRouter);
<<<<<<< HEAD
// app.use("/tweets", tweetsRouter);
// app.use("/users", usersRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter)

>>>>>>> master

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
