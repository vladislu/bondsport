import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("person").del();

  // Inserts seed entries
  await knex("person").insert([
    { name: "person name", document: "000000001" },
  ]);
}