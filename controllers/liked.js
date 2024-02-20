import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getLikeds() {
  return await knex.table("liked").select();
}

export async function getLikedById(id) {
  return await knex.table("liked").first().where({ id });
}

export async function createLiked(user_id, episode_id) {
  const newLiked = {
    id: customAlphabet(chars, 12)(),
    user_id,
    episode_id,
  };
  await knex.table("liked").insert(newLiked);
  return newLiked;
}

export async function updateLiked({ id, user_id, episode_id }) {
  const liked = await knex.table("liked").first().where({ id });
  if (!liked) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    user_id,
    episode_id,
  };
  await knex.table("liked").update(updateFields).where({ id });
  return { ...liked, ...updateFields };
}

export async function deleteLiked(id) {
  const liked = await knex.table("liked").first().where({ id });
  if (!liked) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("liked").delete().where({ id });
  return liked;
}
