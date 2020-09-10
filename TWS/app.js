const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require("sequelize");
const cookieParser = require("cookie-parser"); 
const csrf = require('csurf');


const { environment } = require("./config");
const eventsRouter = require("./routes/events");
const usersRouter = require("./routes/users");
const indexRouter = require("./routes/index.js");
const dashboardRouter = require("./routes/dashboard");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.set('view engine', 'pug');
app.use(cookieParser()); // Adding cookieParser() as application-wide middleware
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true });
app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use('/public', express.static('public'));
app.use('/dashboard', dashboardRouter);
app.use('/', indexRouter);

app.get('/home', (req, res) => {
  res.render('landing-page');
})

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
