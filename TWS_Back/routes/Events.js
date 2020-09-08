const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();

const { event} = model;

router.get('/events',(req,res)=>{
    let events = await event.findAll();
    res.json({events});
})
