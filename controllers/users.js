import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getUsers() {
  return await knex.table("user").select();
}

export async function getUserByEmail(email) {
  return await knex.table("user").first().where({ email });
}

export async function createUser(username, password, email) {
  const newUser = {
    id: customAlphabet(chars, 12)(),
    email,
    username,
    password,
  };
  await knex.table("user").insert(newUser);
  return newUser;
}

export async function updateUser({ id, username, password, email }) {
  const user = await knex.table("user").first().where({ id });
  if (!user) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = { username, password, email };
  await knex.table("user").update(updateFields).where({ id });
  return { ...user, ...updateFields };
}

export async function deleteUser(id) {
  const user = await knex.table("user").first().where({ id });
  if (!user) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("user").delete().where({ id });
  return user;
}
