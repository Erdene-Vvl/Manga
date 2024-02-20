import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function getComments() {
  return await knex.table("comment").select();
}

export async function getCommentById(id) {
  return await knex.table("comment").first().where({ id });
}

export async function createComment(user_id, episode_id, text) {
  const newComment = {
    id: customAlphabet(chars, 12)(),
    user_id,
    episode_id,
    text,
  };
  await knex.table("comment").insert(newComment);
  return newComment;
}

export async function updateComment({ id, user_id, episode_id, text }) {
  const comment = await knex.table("comment").first().where({ id });
  if (!comment) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = {
    user_id,
    episode_id,
    text,
  };
  await knex.table("comment").update(updateFields).where({ id });
  return { ...comment, ...updateFields };
}

export async function deleteComment(id) {
  const comment = await knex.table("comment").first().where({ id });
  if (!comment) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("comment").delete().where({ id });
  return comment;
}
