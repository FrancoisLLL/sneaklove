require('dotenv').config();
require('./config/mongodb'); // database initial setup
require('./helpers/hbs'); // utils for hbs templates

// base dependencies
const express = require('express');
const app = express();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dev_mode = false;
const logger = require('morgan');
const User = require('./models/User');

// config logger (pour debug)
app.use(logger('dev'));

// initial config
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    saveUninitialized: true,
    resave: true,
  })
);

app.use(async (req, res, next) => {
  try {
    if (req.session.currentUser) {
      User.findById(req.session.currentUser._id)
        .then((userFromDb) => {
          res.locals.currentUser = userFromDb;
          res.locals.isLoggedIn = true;
          next();
          // res.locals.isAdmin = userFromDB.isAdmin
        })
        .catch((error) => {
          next(error);
        });
    } else {
      res.locals.currentUser = undefined;
      res.locals.isLoggedIn = false;
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
app.locals.site_url = process.env.SITE_URL;

app.use(flash());

// CUSTOM MIDDLEWARES

if (dev_mode === true) {
  app.use(require('./middlewares/devMode')); // activate dev mode
  app.use(require('./middlewares/debugSessionInfos')); // affiche le contenu de la session
}

app.use(require('./middlewares/exposeLoginStatus')); // expose login status to the views
app.use(require('./middlewares/exposeFlashMessage')); // expose flash messages to views

// routers
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/sneakers'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error.hbs');
});

module.exports = app;
