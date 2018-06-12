var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var leaderboardRouter = require('./routes/leaderboard');
var cssdemoRouter = require('./routes/cssdemo');
var imagedemoRouter = require('./routes/imagedemo');
var formdemoRouter = require('./routes/formdemo');
var usersRouter = require('./routes/users');
var playRouter = require('./routes/play'); // nvm
var settingsRouter = require('./routes/settings');
var squareRouter = require('./routes/square');

var app = express();

router.get('/square', function(req, res, next){
  res.render('square',{x:0,square:0});
})

router.post('/square', function(req, res, next){
  const x = parseInt(req.bodt.x);
  const square = x*x;
  res.render('square',{x:0,square:0});
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/cssdemo', cssdemoRouter);
app.use('/imagedemo', imagedemoRouter);
app.use('/formdemo', formdemoRouter);
app.use('/users', usersRouter);
app.use('/play', playRouter);
app.use('/settings', settingsRouter);
app.use('/square', squareRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
