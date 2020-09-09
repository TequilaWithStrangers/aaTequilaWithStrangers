const express = require("express");
const {asyncHandler} = require('./utils/utils');
const {Event, City, Users} = require('../models');
const router = express.Router();



router.get('/', asyncHandler( async (req,res)=>{
    // const events = await Event.findAll({where:req.userId, include{Users}});
    res.render('dashboard',{events});

}))












module.exports = router;
