const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const { asyncHandler } = require('./utils/utils');

const { Attendee, City, Event, User } = require('../models');
const router = express.Router();

router.use(cookieParser());
router.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true });


//router for update event form
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const event = await Event.findOne({
        where: { id },
        include: { model: City },
    });

    const shortDateArray = event.date.toString().split("").slice(4, 15)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthString = shortDateArray.slice(0, 3).join("")
    const monthIndex = (months.indexOf(monthString) + 1).toString()

    const year = shortDateArray.slice(7, 11).join("")
    const month = ("0" + monthIndex).slice(-2)
    const date = shortDateArray.slice(4, 6).join("")

    const formatedDate = year + "-" + month + "-" + date

    event.dataValues.date = formatedDate

    const host = await User.findOne({
        where: { id: event.hostId },
        include: { model: City },
    })
    const cities = await City.findAll({ order: ['name'] });

    res.render('update-event-form', { event, host, cities, csrfToken: req.csrfToken() });
}));

//router for updating event
// router.post('/:id(\\d+)',
//     asyncHandler(async (req, res) => {
//         const { cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit, _csrf } = req.body;
//         const { id } = req.params.id;

//         const event = await Event.findByPK(id)
//         await event.update({
//             cityId,
//             date,
//             time,
//             venue,
//             address,
//             name,
//             description,
//             hostId,
//             numOfGuests,
//             limit,
//             _csrf
//         })

//         res.redirect(`/events/${id}`)
//     }));


module.exports = router;