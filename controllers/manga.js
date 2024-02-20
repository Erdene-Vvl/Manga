import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getMangas() {
  return await knex.table("manga").select();
}

export async function getMangaById(id) {
  return await knex.table("manga").first().where({ id });
}

export async function createManga(
  genre,
  title,
  description,
  season,
  author,
  release_date,
  owner,
  rating,
  views,
  like
) {
  const newManga = {
    id: customAlphabet(chars, 12)(),
    genre,
    title,
    description,
    season,
    author,
    release_date,
    owner,
    rating,
    views,
    like,
  };
  await knex.table("manga").insert(newManga);
  return newManga;
}

export async function updateManga({
  id,
  genre,
  title,
  description,
  season,
  author,
  release_date,
  owner,
  rating,
  views,
  like,
}) {
  const manga = await knex.table("manga").first().where({ id });
  if (!manga) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    genre,
    title,
    description,
    season,
    author,
    release_date,
    owner,
    rating,
    views,
    like,
  };
  await knex.table("manga").update(updateFields).where({ id });
  return { ...manga, ...updateFields };
}

export async function deleteManga(id) {
  const manga = await knex.table("manga").first().where({ id });
  if (!manga) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("manga").delete().where({ id });
  return manga;
}
