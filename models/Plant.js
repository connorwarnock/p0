var bookshelf = require('../config/bookshelf.js'),
    logger = require('../config/logger'),
    _ = require('lodash');

module.exports = model =  bookshelf.model('Plant', {
  tableName: "plants",
  format: function(attrs) {
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.snakeCase(key)] = val;
      return memo;
    }, {});
  },
  parse: function(attrs) {
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.camelCase(key)] = val;
      return memo;
    }, {});
  },
  listenForVitals: function() {
    var _this = this;
    var spark = require('spark');
    spark.login({ username: 'particleiousername', password: 'particleiopassword' })
    .then(function(token) {
      spark.getDevice(_this.get('particleDeviceId'), function(err, device) {
        device.subscribe('moisture', function(payload) {
          parsedData = JSON.parse(payload.data);
          _this.set('moisture', parsedData[_this.get('particlePinNumber')]);
          _this.broadcastVitals();
        });
        logger.info('Now listening for events for device ' + device.name);
      });
    });
  },
  broadcastVitals: function() {
    if (typeof this.get('io') == "undefined") throw 'io is not set';
    var data = {
      moisture: this.get('moisture'),
    };
    this.get('io').of(this.namespace()).emit('moisture', data);
  },
  namespace: function() {
    return '/plants:' + this.get('id');
  }
});
