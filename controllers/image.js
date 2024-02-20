import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getImages() {
  return await knex.table("image").select();
}

export async function getImageById(id) {
  return await knex.table("image").first().where({ id });
}

export async function createImage(url, episode, order) {
  const newImage = {
    id: customAlphabet(chars, 12)(),
    url,
    episode,
    order,
  };
  await knex.table("image").insert(newImage);
  return newImage;
}

export async function updateImage({ id, url, episode, order }) {
  const image = await knex.table("image").first().where({ id });
  if (!image) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    url,
    episode,
    order,
  };
  await knex.table("image").update(updateFields).where({ id });
  return { ...image, ...updateFields };
}

export async function deleteImage(id) {
  const image = await knex.table("image").first().where({ id });
  if (!image) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("image").delete().where({ id });
  return image;
}
