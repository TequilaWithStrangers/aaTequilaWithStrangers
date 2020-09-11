const express = require("express");
const {asyncHandler} = require('./utils/utils');
const {Event, City, User} = require('../models');
const router = express.Router();



router.get('/', asyncHandler( async (req,res)=>{
    res.render('dashboard');
}));
router.get('/cities/:id(\\d+)',asyncHandler( async (req,res)=>{
    let userId = req.params.id;
    let userIdN = Number.parseInt(userId);
    let user = await User.findByPk(userIdN);
    const events = await Event.findAll({where:{cityId:user.cityId},include:{model:City}});
    events.push(user.firstName);
    res.json(events);
}))












module.exports = router;
