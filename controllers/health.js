var Plant = require('../models/Plant');

exports.check = function(req, res) {
  // smoke test to ensure mongo is working, no need to return any actual token
  // as long as the db is working, we're 200 OK
  Plant.fetchAll()
  .then(function(collection) {
    return res.set('Content-Type', 'text/plain').send('OK');
  });
};
