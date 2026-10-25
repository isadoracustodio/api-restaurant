import type { Knex } from "knex";

// cria a tabela
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("products", (table) => {
        table.increments("id").primary(),
        table.text("name").notNullable(),
        table.decimal("price").notNullable(),
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}

// deleta a tabela
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("products")
}

