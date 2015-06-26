var winston = require('winston');
var app = require('../app');

winston.cli();
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'error' }),
    new (winston.transports.File)({ filename: __dirname + '/../log/' + app.get('env') + '.log', level: 'debug', json: false})
  ]
});

app.use(require('winston-request-logger').create(logger));

module.exports = logger;
