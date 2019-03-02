const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const loginRouter   = require('./routes/login');
const signupRouter  = require('./routes/signup');
const logoutRouter  = require('./routes/logout');
const profileRouter = require('./routes/profile');
const authRouter    = require('./routes/auth');

const app = express();


mongoose.connect('mongodb://localhost/my-database', {useNewUrlParser: true}, (err)=> {
  (err) ? console.log(err) : console.log('Connected to mongodb');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Secret message of the day', {signed: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth/*', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth/profile', profileRouter);

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
