const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const app = require('../app');

const router = express.Router();
router.use(cookieParser());

router.get('/user/register', csrfProtection, asyncHandler( async (req, res) => {
     const user = await db.user.build();
     res.render('user-register', {
          title: 'Register',
          csrfToken: req.csrfToken(),
          user
     });
}));

router.post('/user/register', cookieParser, csrfProtection, asyncHandler( async (req, res) => {
     const { firstName, lastName, email, password, confirmedPassword } = req.body;
     const errors = [];

     if(!firstName || firstName.length > 50) {
          errors.push('Please enter a valid first name.');
     } else if (!lastName || lastName.length > 50) {
          errors.push('Please enter a valid last name.');
     } else if (!email || email.length > 255 || email === /?=.*[@].*\..*/) {
          errors.push('Please enter a valid email address.');
     } else if (await db.User.findOne({ where: { email }})) {
          errors.push('Email already exists');
     } else if (!password || password.length > 50 || password.length < 8) {
          errors.push('Please enter a valid password');
     } else if (password !== /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/) {
          errors.push('Password should contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')
     } else if (password !== confirmedPassword) {
          errors.push('Passwords must match');
     }

     if (errors.length === 0) {
          const hashedPassword = await bcrypt.hash(password, 10);

          const user = db.User.build({ firstName, lastName, email, hashedPassword });
          await user.save();
          res.redirect('/');
     } else {
          res.render('user-register', { title: 'Register', csrfToken: req.csrfToken(), errors, firstName, lastName });
     }


}));

module.exports = router;