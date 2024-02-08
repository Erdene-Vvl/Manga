import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export async function updateJob({ id, companyId, title, description }) {
  const job = await knex.table("job").first().where({ id, companyId });
  if (!job) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  const updateFields = { title, description };
  await knex.table("job").update(updateFields).where({ id });
  return { ...job, ...updateFields };
}

export async function deleteJob(id, companyId) {
  const job = await knex.table("job").first().where({ id, companyId });
  if (!job) {
    throw Error(` ${id} ID-тэй зар олдсонгүй!`);
  }
  await knex.table("job").delete().where({ id });
  return job;
}

export async function createJob(companyId, title, description) {
  const newJob = {
    id: customAlphabet(chars, 12)(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  await knex.table("job").insert(newJob);
  return newJob;
}

export async function getJobsByCompanyId(companyId) {
  return await knex.table("job").select().where({ companyId });
}

export async function getJobs() {
  return await knex.table("job").select();
}

export async function getJobById(id) {
  return await knex.table("job").first().where({ id });
}
