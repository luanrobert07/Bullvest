exports.up = knex => knex.schema.alterTable("exercises", table => {
    table.text("content");
    table.text("Options");
    table.text("Image");

    table.dropColumn("repetitions");
    table.renameColumn("series", "quantity");
});

exports.down = knex => knex.schema.alterTable("exercises", table => {
    table.dropColumn("content");
    table.dropColumn("Options");
    table.dropColumn("Image");

    table.integer("repetitions"); // Adicione o tipo correto para a coluna 'repetitions' se não for 'integer'
    table.renameColumn("quantity", "series");
});
