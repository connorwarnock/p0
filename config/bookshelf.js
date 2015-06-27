var app = require('../app'),
    Bookshelf = require('bookshelf'),
    dbConnection = require('../knexfile.js')[app.get('env')];

var knex = require('knex')({
  client: dbConnection['client'],
  connection: {
    host: dbConnection['connection']['host'],
    user: dbConnection['connection']['user'],
    password: dbConnection['connection']['password'],
    database: dbConnection['connection']['database']
  }
});

var bookshelf = Bookshelf(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;
