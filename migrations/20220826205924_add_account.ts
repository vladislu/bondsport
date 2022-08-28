import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("account", (table) => {
    table.increments("accountId").primary();
    table
      .integer("personId")
      .notNullable()
      .unsigned()
      .references("person.personId");
    table.decimal("balance").defaultTo(0).notNullable();
    table.decimal("daliyWithdrawalLimit").defaultTo(0).notNullable();
    table.boolean("activeFlag").defaultTo(true).notNullable();
    table.integer("accountType").nullable();
    table.timestamp('createDate').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("account");
}
