process.env.NODE_ENV = "test";
var request = require('supertest'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    should = require('should'),
    app = require('../../app'),
    bookshelf = require('../../config/bookshelf');

// The health endpoint simply checks a db connection and responds 200 ok
describe("Health route", function() {
  beforeEach(function(done) {
    Promise.all( _.map( bookshelf.models, function(model) {
      return bookshelf.knex( model.forge().tableName).truncate();
    }))
    .done(function() {
      done();
    });
  });

  describe("GET /health", function() {
    describe("with the database working", function() {
      it("should respond successfully", function(done) {
        request(app)
          .get('/health')
          //.set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            res.text.should.equal('OK');
            return done();
          });
      });
    });

  });
});
