var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var models = path.join(__dirname, 'app/models');

var sass = require('node-sass-middleware');
var mongoose = require('mongoose');

var helpers = require('view-helpers');
var pkg = require('./package.json');

var fs = require('fs');

var app = express();


var connection = mongoose.connect('mongodb://localhost/node_twitter').connection;
connection.on('error', console.log);


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser())

app.use(sass({
  src: path.join(__dirname, 'client'),
  dest: path.join(__dirname, 'public'),
  debug: true
  // outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helpers(pkg.name));

fs.readdirSync(models).forEach(
  file => {
    require(path.join(models, file));
  }
);



var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

const tweets = require('./app/controllers/tweets');

require('./config/routes')(app);

// app.use('/', index);
app.use('/users', users);
app.use('/api', api);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

module.exports = app;