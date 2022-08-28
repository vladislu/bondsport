import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("person", (table) => {
    table.increments("personId").primary();
    table.string("name");
    table.string("document").nullable();
    table.timestamp("birthDate").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("person");
}
