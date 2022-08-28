import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transaction", (table) => {
    table.increments("transactionId").primary();
    table
      .integer("accountId")
      .notNullable()
      .unsigned()
      .references("account.accountId");
    table.decimal("value").defaultTo(0).notNullable();
    table.timestamp('transactionDate').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transaction");
}