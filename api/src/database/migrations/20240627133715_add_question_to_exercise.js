exports.up = knex => knex.schema.alterTable("exercises", table => {
    table.text("question");
  });
  
  exports.down = knex => knex.schema.alterTable("exercises", table => {
    table.dropColumn("question");
  });
  