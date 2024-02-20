import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getEpisodes() {
  return await knex.table("episode").select();
}

export async function getEpisodeById(id) {
  return await knex.table("episode").first().where({ id });
}

export async function createEpisode(
  title,
  date,
  like,
  cover,
  manga,
  views,
  rating,
  like
) {
  const newEpisode = {
    id: customAlphabet(chars, 12)(),
    title,
    date,
    like,
    cover,
    manga,
    views,
    rating,
    like,
  };
  await knex.table("episode").insert(newEpisode);
  return newEpisode;
}

export async function updateEpisode({
  id,
  title,
  date,
  like,
  cover,
  manga,
  views,
  rating,
  like,
}) {
  const episode = await knex.table("episode").first().where({ id });
  if (!episode) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    title,
    date,
    like,
    cover,
    manga,
    views,
    rating,
    like,
  };
  await knex.table("episode").update(updateFields).where({ id });
  return { ...episode, ...updateFields };
}

export async function deleteEpisode(id) {
  const episode = await knex.table("episode").first().where({ id });
  if (!episode) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("episode").delete().where({ id });
  return episode;
}
