import DataLoader from "dataloader";
import knex from "../lib/db.js";

export async function getCompanyById(id) {
  return await knex.table("company").first().where({ id });
}

export function createCompanyLoader() {
  return new DataLoader(async (ids) => {
    // ids =                      ["a", "d", "b", "c"]
    // companies                  ["A", "D", "B", "C"]
    // select * from company ==>  ["A", "B", "C", "D"]
    const companies = await knex.table("company").select().whereIn("id", ids);
    return ids.map((id) => companies.find((company) => company.id === id));
  });
}
