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

  describe("GET /plants", function() {
    var plant1, plant2, plant3;
    beforeEach(function(done){
      Promise.all([
        new Plant({name: 'Plant 1'}).save().then(function(model) {
          plant1 = model;
        }),
        new Plant({name: 'Plant 1'}).save().then(function(model) {
          plant2 = model;
        }),
        new Plant({name: 'Plant 1'}).save().then(function(model) {
          plant3 = model;
        })
      ]).then(function() {
        done();
      });
    });

    it("lists the the plants", function(done) {
      request(app)
        .get('/plants')
        .set('Accept', 'application/json')
        .type('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // don't want to expose the hashed password
          res.body.should.have.property('results');
          res.body.results.length.should == 3
          return done();
        });
    });
  });
});
