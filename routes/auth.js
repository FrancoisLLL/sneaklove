const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const SALT = 10;
const User = require('../models/User');
const { NotExtended } = require('http-errors');

//////Sign In Sign up
router.get('/signup', (req, res) => {
    res.render('signup');
    //console.log(req.query);
});

router.get('/signin', (req, res) => {
    res.render('signin');
    //console.log(req.query);
});

router.post('/signup', async (req, res, next) => {
    //res.send(req.body)
    try {
        const {
            name,
            lastname,
            email,
            password
        } = req.body;
        if (!email || !password || !name || !lastname) {
            console.log("missing input")
            res.redirect('/signup');
            next();
        }
        const usedEmail = await User.findOne({
            email: email
        });
        if (usedEmail) {
            console.log("used email")

            res.redirect('/signup');
        } else {
            console.log("logged in")

            const securePassword = await bcrypt.hashSync(password, SALT);
            console.log(securePassword,password, SALT);
            try{
                await User.create({name, lastname, email, securePassword});
            }
            catch(e){
                console.log(e);
            }
            console.log(`user created: ${name}`);
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
        const {
            email,
            password
        } = req.body;
        if (!email || !password) {
            res.redirect('/signin', {
                msg: {
                    status: 400,
                    text: 'Wrong credentials'
                }
            });
        } else {
            const validUser = await User.findOne({
                email: email
            });
            if (validUser) {
                const validPass = await bcrypt.compareSync(
                    password,
                    validUser.password
                );
                if (validPass) {
                    req.session.currentUser = {
                        _id: validUser._id
                    };
                    res.redirect('/');
                }
            } else {
                res.redirect('/signin', {
                    msg: {
                        status: 400,
                        text: 'Wrong credentials'
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;