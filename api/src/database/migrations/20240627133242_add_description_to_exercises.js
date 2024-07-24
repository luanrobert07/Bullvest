exports.up = knex => knex.schema.alterTable("exercises", table => {
    table.text("description").notNullable();
  });
  
  exports.down = knex => knex.schema.alterTable("exercises", table => {
    table.dropColumn("description");
  });
  