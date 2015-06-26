var Plant = require('../models/Plant');
var _ = require('lodash');

var setupSockets = function(io) {
  io.on('connection', function(socket){
    console.log('Started socket.io');
    // if particle.io is setup, then listen to streams for all plants
    Plant.fetchAll()
    .then(function(collection) {
      _.each(collection.models, function(model) {
        console.log('listening for particle events for ' + model.get('name'));
        model.set('io', io);
        model.listenForVitals(io);
      });
    });
  });
};

module.exports = setupSockets;
