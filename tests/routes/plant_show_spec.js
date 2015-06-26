process.env.NODE_ENV = "test";
var request = require('supertest'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    should = require('should'),
    app = require('../../app'),
    bookshelf = require('../../config/bookshelf'),
    Plant = require('../../models/Plant');

describe("Plant routes", function() {

  beforeEach(function(done) {
    Promise.all( _.map( bookshelf.models, function(model) {
      return bookshelf.knex(model.forge().tableName).truncate();
    }))
    .done(function() {
      done();
    });
  });

  describe("GET /plants/:plant_id", function() {
    var plant;
    beforeEach(function(done){
      new Plant({name: 'Plant 1'}).save().then(function(model) {
        plant = model;
        done();
      });
    });

    it("shows the plant", function(done) {
      request(app)
        .get('/plants/' + plant.get('id'))
        .set('Accept', 'application/json')
        .type('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // don't want to expose the hashed password
          res.body.should.have.property('id');
          res.body.name.should.equal('Plant 1');
          return done();
        });
    });
  });
});
