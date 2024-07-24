// migrations/<timestamp>_add_xp_to_exercises.js

exports.up = function(knex) {
    return knex.schema.table('exercises', function(table) {
      table.integer('xp').defaultTo(0);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('exercises', function(table) {
      table.dropColumn('xp');
    });
  };
  