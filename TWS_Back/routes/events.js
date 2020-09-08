const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const { csrfProtection, asyncHandler } = require('./utils');

const eventsRouter = express.Router();


eventsRouter.get('/events/:id(\\d+)', )


module.exports = eventsRouter;