var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./connection');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require("mongoose");
var webpush = require('web-push');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080/');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  // next();


  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();

});
mongoose.connection.once('open', function callback() {
  console.log("DATABASE connected with localhost:27017");
});
var mongoose = require ('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(db.uri(),{ useNewUrlParser: true });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const vapidKeys =
{ "publicKey": "BMCs4gzye6J7zRnooWqa-cgHYdY62XAGqOZBgjBQyxp5KDtOCLIBAxV5sJqsBVf7tub2XmShxpMt5LGZvqVj5w0", "privateKey": "q1ZPnWsp3T64s352E_iQlXf4P3CBPvsT8rPJ-QlH2W0" }



webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
  );
  
  app.listen(3000, function () {
    console.log("listening to port 3000 ")
  })
  
  // REST API
  // app.route('/api/lessons')
  //   .get(readAllLessons);
  
  
  // app.route('/api/newsletter')
  //   .post(sendNewsletter);
  
  
  
  
  module.exports = app;
  