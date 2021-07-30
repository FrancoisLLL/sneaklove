const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const SALT = 10;
const User = require('../models/User');

//////Sign In Sign up
router.get('/signup', (req, res) => {
  res.render('signup');
  //console.log(req.query);
});

router.get('/signin', (req, res) => {
  res.render('signin');
  console.log(req.query);
});

router.post('/signup', async (req, res) => {
  //res.send(req.body)
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!email || !password || !firstname || !lastname) {
      res.render('/signin', {
        errorMessage: 'You need to fill all the form',
      });
    }
    const usedEmail = await User.findOne({ email: email });
    if (usedEmail) {
      res.render('/signin', {
        errorMessage: 'Email is already taken',
      });
    } else {
      const securePassword = await bcrypt.hashSync(password, SALT);
      await User.create(firstname, lastname, email, securePassword);
      console.log(`user created: ${firstname}`);
      res.redirect('/signin');
    }
  } catch {
    (e) => console.log(e);
  }
});

router.post('/signin', async (req, res) => {
  // console.log(req.body);
  // res.send(req.body)
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.redirect('/signin', {
        errorMessage: 'Wrong credentials',
      });
    } else {
      const validUser = await User.findOne({ email: email });
      if (validUser) {
        const validPass = await bcrypt.compareSync(
          password,
          validUser.password
        );
        if (validPass) {
          req.session.currentUser = { _id: validUser._id };
          res.redirect('/');
        }
      } else {
        res.redirect('/signin', {
          errorMessage: 'Wrong credentials',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
