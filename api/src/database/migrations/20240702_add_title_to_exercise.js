exports.up = knex => knex.schema.alterTable("exercises", table => {
    table.text("title");
  });
  
  exports.down = knex => knex.schema.alterTable("exercises", table => {
    table.dropColumn("title");
  });
  