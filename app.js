const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const expressValidator = require('express-validator');

const app = express();

const index = require('./routes/index');
const users = require('./routes/users');
const orders = require('./routes/orders');
const categories = require('./routes/categories');

const mongoose = require('mongoose');

// database is called recipes
mongoose.connect('mongodb://localhost/h3rmes');
const { connection: db } = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to h3rmes database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./config/passport')(passport); // pass passport for configuration

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator for form validation
// app.use(expressValidator({
//   errorFormatter: (param, msg, value) => {
//     const namespace = param.split('.');
//     const root = namespace.shift();
//     let formParam = root;
//
//     while (namespace.length) {
//       formParam += `[${namespace.shift()}]`;
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value,
//     };
//   },
// }));

// required for passport
app.use(session({
  secret: 'sessionsecretstring',
  saveUninitialized: false,
  resave: false,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const authenticated = require('./middleware/authenticated');
app.use('/categories*', authenticated);
app.use('/users', users)
app.use('/', index);
app.use('/orders', orders);
app.use('/categories', categories);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
