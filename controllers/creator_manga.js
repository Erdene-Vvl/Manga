import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getCreatorMangas() {
  return await knex.table("creator_manga").select();
}

export async function getCreatorMangaById(id) {
  return await knex.table("creator_manga").first().where({ id });
}

export async function createCreatorManga(creator_id, manga_id) {
  const newCreatorManga = {
    id: customAlphabet(chars, 12)(),
    creator_id,
    manga_id,
  };
  await knex.table("creator_manga").insert(newCreatorManga);
  return newCreatorManga;
}

export async function updatecreator_manga({ id, creator_id, manga_id }) {
  const creator_manga = await knex.table("creator_manga").first().where({ id });
  if (!creator_manga) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    creator_id,
    manga_id,
  };
  await knex.table("creator_manga").update(updateFields).where({ id });
  return { ...creator_manga, ...updateFields };
}

export async function deleteCreator_manga(id) {
  const creator_manga = await knex.table("creator_manga").first().where({ id });
  if (!creator_manga) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("creator_manga").delete().where({ id });
  return creator_manga;
}
