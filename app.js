var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const helmet = require('helmet'); //t0d

const mongoose = require('mongoose'); //t0d
const flash = require('connect-flash'); //t0d
// const fileUpload = require('express-fileupload'); //t0d

//v//==>Middleware for easily accessing environment variables
const dotenv = require('dotenv');
dotenv.config();
console.log(`SECRET from .env==> ${process.env.SECRET}`);
//^//==>Middleware for easily accessing environment variables

//v//==>Needed for Passport
const session = require('express-session');
const passport = require('passport'); //t0d
// const GitHubStrategy = require('passport-github').Strategy; //t0d
//^//==>Needed for Passport

//passport config
require('./config/passport-t0d')(passport);

//Mongo DB config
const db = require('./config/keys').MongoURI; //t0d

//Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(err => console.log(err)); //t0d

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const indexRouter = require('./routes/rt-index'); //t0d
const retailCalcPassportRouter = require('./routes/rt-retailCalcPassport'); //t0d
const retailCalcSimpleRouter = require('./routes/rt-retailCalcSimple'); //t0d
const usersRouter = require('./routes/rt-users'); //t0d

const editItemPassportRouter = require('./routes/rt-editItemPassport'); //t0d

const wsDiffPassportRouter = require('./routes/rt-wsDiffPassport'); //t0d
const wsDiffSimpleRouter = require('./routes/rt-wsDiffSimple'); //t0d

var app = express();

// // default options for express-fileuploader
// app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet()); //t0d

//v//==>Passport config-mixing tuts (bunch + traversy) //t0d
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  // cookie: {
  //   secure: true
  // }
}))
console.log('process.env==>', process.env)
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   // cookie: {
//   //   secure: true
//   // }
// }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//^//==>Passport config-mixing tuts (bunch + traversy) //t0d

//GLOBAL VARIABLES (t0d from traversy)
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})


//v//==>NOTE: THESE ROUTES MUST COME AFTER THE GLOBAL VARIABLES, OR THE GLOBAL VARIABLES WON'T WORK FOR THOSE PAGES
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', indexRouter); //t0d
app.use('/retailCalcPassport', retailCalcPassportRouter); //t0d
app.use('/retailCalcSimple', retailCalcSimpleRouter); //t0d
app.use('/users', usersRouter); //t0d

app.use('/editItemPassport', editItemPassportRouter); //t0d

app.use('/wsDiffPassport', wsDiffPassportRouter) //t0d
app.use('/wsDiffSimple', wsDiffSimpleRouter) //t0d
//^//==>NOTE: THESE ROUTES MUST COME AFTER THE GLOBAL VARIABLES, OR THE GLOBAL VARIABLES WON'T WORK FOR THOSE PAGES

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
  res.render('error');
});

module.exports = app;