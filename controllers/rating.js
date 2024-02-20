import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getRatings() {
  return await knex.table("rating").select();
}

export async function getRatingById(id) {
  return await knex.table("rating").first().where({ id });
}

export async function createRating(user_id, episode_id, point) {
  const newRating = {
    id: customAlphabet(chars, 12)(),
    user_id,
    episode_id,
    point,
  };
  await knex.table("rating").insert(newRating);
  return newRating;
}

export async function updateRating({ id, user_id, episode_id, point }) {
  const rating = await knex.table("rating").first().where({ id });
  if (!rating) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    user_id,
    episode_id,
    point,
  };
  await knex.table("rating").update(updateFields).where({ id });
  return { ...rating, ...updateFields };
}

export async function deleteRating(id) {
  const rating = await knex.table("rating").first().where({ id });
  if (!rating) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("rating").delete().where({ id });
  return rating;
}
