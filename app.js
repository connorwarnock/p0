var express = require('express');
var fs = require('fs');

var app = module.exports = express();

var bookshelf = require('./config/bookshelf');

var models_path = __dirname + '/models';
bookshelf.models = []
fs.readdirSync(models_path).forEach(function(file){
  var model = require(models_path + '/' + file);
  bookshelf.models.push(model)//;
});

var demoClient = process.env.DEMO_CLIENT == 'true' ? true : false;
app.set('demoClient', demoClient);

var global = require('./config/global');
var envConfg = require('./config/' + app.get('env'));
