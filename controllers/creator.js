import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getCreators() {
  return await knex.table("creator").select();
}

export async function getCreatorById(id) {
  return await knex.table("creator").first().where({ id });
}

export async function createCreator(username, password, email, bank_account) {
  const newCreator = {
    id: customAlphabet(chars, 12)(),
    username,
    password,
    email,
    bank_account,
  };
  await knex.table("creator").insert(newCreator);
  return newCreator;
}

export async function updatecreator({
  id,
  username,
  password,
  email,
  bank_account,
}) {
  const creator = await knex.table("creator").first().where({ id });
  if (!creator) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    username,
    password,
    email,
    bank_account,
  };
  await knex.table("creator").update(updateFields).where({ id });
  return { ...creator, ...updateFields };
}

export async function deleteCreator(id) {
  const creator = await knex.table("creator").first().where({ id });
  if (!creator) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("creator").delete().where({ id });
  return creator;
}
