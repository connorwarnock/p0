
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('SET foreign_key_checks = 0;'),
    knex.schema.createTable('plants', function (table) {
      table.bigIncrements('id').primary().unsigned();
      table.string('name',50);
      table.string('particle_device_id',50);
      table.string('particle_pin_number',10);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('SET foreign_key_checks = 0;'),
    knex.schema.dropTable('plants')
  ]);
};
