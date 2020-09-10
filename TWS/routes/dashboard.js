const express = require("express");
const {asyncHandler} = require('./utils/utils');
const {Event, City, Users} = require('../models');
const router = express.Router();



router.get('/', asyncHandler( async (req,res)=>{
    let userId = localStorage.getItem('TEQ_CURRENT_USER_ID')
    // const events = await Event.findAll({where:userId, include{model:City}});
    req.body
    res.render('dashboard',{events});

}))












module.exports = router;
