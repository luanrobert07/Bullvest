exports.up = knex => knex.schema.createTable("exercises", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.integer("quantity").notNullable();
  table.text("group").notNullable();
  table.text("demo").notNullable();
  table.text("thumb").notNullable();
  table.text("description").notNullable();
  table.text("question").notNullable();
  table.text("image").notNullable();
  table.text("options").notNullable();
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("exercises");