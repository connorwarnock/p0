var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    app = require('../app'),
    Promise = require('bluebird'),
    bookshelf = require('../config/bookshelf'),
    Plant = require('../models/Plant');

var bootstrapData = fs.readFileSync(path.resolve(__dirname, 'bootstrap.json'), 'utf8');

bootstrapData = bootstrapData.split('\n');

if (bootstrapData[bootstrapData.length-1].length <= 0) {
   // delete last row (mostly a empty row)
  bootstrapData.pop();
}

console.log('Bootstrapping plant data in ' + app.get('env') + ' environment');
Promise.all( _.map( bookshelf.models, function(model) {
  return bookshelf.knex(model.forge().tableName).truncate();
}))
.done(function() {

  var plantCreations = [];

  bootstrapData.forEach(function(plantJson) {
    var plantJson = JSON.parse(plantJson);
    console.log('Creating plant: ' + plantJson.name);
    var plantCreation = new Plant({
      name: plantJson.name,
      particle_device_id: plantJson.particle_device_id,
      particle_pin_number: plantJson.particle_pin_number
    }).save()
    plantCreations.push(plantCreation);
  });

  Promise.settle(plantCreations).then(function() {
    console.log('Done');
    process.exit(0);
  });
});
