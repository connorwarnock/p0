process.env.NODE_ENV = "test";
var request = require('supertest'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    should = require('should'),
    app = require('../../app'),
    bookshelf = require('../../config/bookshelf'),
    ioClient = require('socket.io-client'),
    Plant = require('../../models/Plant');


describe('Plant sockets', function() {
  var serverURL = 'http://0.0.0.0:5000';
  var options = {
    transports: ['websocket'],
    'force new connection': true
  };
  var client, ioServer, plant;

  beforeEach(function(done) {
    // start the server!
    app.set('port', process.env.PORT || 5000); // 5000 so we don't interfere with the dev server
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });

    ioServer = require('socket.io').listen(server);

    new Plant({name: 'Plant 1'}).save().then(function(model) {
      plant = model;
      plant.set('io', ioServer);

      // client js
      var namespace = '/plants:' + plant.get('id');
      client = ioClient.connect(serverURL + namespace, options);

      // ensure that the server and client have connected
      ioServer.of(namespace).on('connection', function() {
        client.once('connect', function() {
          done();
        });
      });
    });
  });

  it('should broadcast new plant data to clients in the namespace', function(done) {
    // client js
    client.on('moisture', function(data) {
      // client should receive a data broadcast
      data.moisture.should == 30;
      done();
    });

    plant.set('moisture', 30);
    plant.broadcastVitals();
  });
});
