module.exports = function(app) {
  var plantsController = require('../controllers/plants'),
      healthController = require('../controllers/health');

  app.get('/health', healthController.check);

  // if in demo client mode, then render homepage
  if (app.get('demoClient')) {
    app.get('/', function(req, res) {
      res.render('index.jade');
    });
  }

  app.get('/plants', plantsController.list);
  app.get('/plants/:plant_id', plantsController.show);
  app.get('/plants/:plant_id/history', plantsController.show);

};
