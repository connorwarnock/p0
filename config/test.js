var app = require('../app');
var winston = require('winston');
var logger = require('../config/logger');

// print stacktrace on development
app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: err
  });
  return next(new Error(err));
});
