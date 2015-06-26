var express = require('express');
var bodyParser = require('body-parser');
var app = require('../app');
var path = require('path');
var favicon = require('static-favicon');
var fs  = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./logger');
var router = require('../routes/index');

app.use(bodyParser.json());
if (app.get('env') == ('development' || 'test')) {
  app.set('showStackError', true);
}

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// Set routes
router(app);

app.use(express.static(path.join(__dirname, '../public')));

// catch 404 error
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
