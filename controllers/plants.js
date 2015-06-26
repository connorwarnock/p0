var _ = require('lodash'),
    bookshelf = require('../config/bookshelf.js'),
    Plant = require('../models/Plant');

exports.list = function(req, res) {
  var offset = typeof req.offset == undefined ? req.offset : 0;
  var limit = typeof req.limit == undefined ? req.limit : 20;
  var Plants = bookshelf.Collection.extend({
   model: Plant
  });

  Plants
  .query({
    offset: offset,
    limit: limit
  })
  .fetch()
  .then(function(collection) {
    var response = {
      count: collection.models.length,
      offset: offset,
      results: collection.models
    };
    return res.status(200).json(response);
  });
};

exports.show = function(req, res) {
  // first ensure email and password passed
  var id = req.params.plant_id;

  if (typeof id === "undefined") {
    return res.json(400, { error: "Must provide a id"});
  }

  // Attempt to find user by the provided email
  new Plant({
    'id': id
  })
  .fetch()
  .then(function(plant) {
    if (plant == undefined) {
      return res.status(404).json({error: "Plant not found."});
    }
    return res.status(200).json(plant);
  });
};
