import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getBanners() {
  return await knex.table("banner").select();
}

export async function getBannerById(id) {
  return await knex.table("banner").first().where({ id });
}

export async function createBanner(manga_id, url) {
  const newBanner = {
    id: customAlphabet(chars, 12)(),
    manga_id,
    url,
  };
  await knex.table("banner").insert(newBanner);
  return newBanner;
}

export async function updateBanner({ id, manga_id, url }) {
  const banner = await knex.table("banner").first().where({ id });
  if (!banner) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    manga_id,
    url,
  };
  await knex.table("banner").update(updateFields).where({ id });
  return { ...banner, ...updateFields };
}

export async function deleteBanner(id) {
  const banner = await knex.table("banner").first().where({ id });
  if (!banner) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("banner").delete().where({ id });
  return banner;
}
