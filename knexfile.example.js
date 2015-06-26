// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      database: 'phyto_development',
      user:     'root',
      password: ''
    }
  },

  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      database: 'circle_test',
      user:     'ubuntu',
      password: ''
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    }
  }
};
