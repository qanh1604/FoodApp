var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/product');  
var apiRouter = require('./routes/api');
var mongoose = require('mongoose');
require('./models/categoryModel');
require('./models/productModel');


var app = express();
//connect db
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB Connected!'))
.catch(err => console.log('DB error',err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var hbs = require('hbs');
hbs.registerHelper('soSanh', function(a, b, t){
  console.log(a,b);
  return a.toString() == b.toString() 
});
hbs.registerHelper('formatDate', function(a, t){
  console.log(a);
  let date = new Date(a);
  let m = date.getMonth() + 1;
  let year = date.getFullYear();
  let month = m.toString().length == 1 ? '0' + m : m; 
  let day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();
  return year + '-' + month + '-' + day
  // return a.toString().slice(4, 15)
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.JWT_KEY, 
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);
app.use('/api', apiRouter);

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
