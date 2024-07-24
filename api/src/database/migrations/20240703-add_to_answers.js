// migrations/20240704120000_add_answers_to_exercises.js

exports.up = function(knex) {
    return knex.schema.table('exercises', function(table) {
      table.integer('answers').defaultTo(0);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('exercises', function(table) {
      table.dropColumn('answers');
    });
  };
  