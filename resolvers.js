import { GraphQLError } from "graphql";
import {
  getJobs,
  getJobById,
  getJobsByCompanyId,
  createJob,
  deleteJob,
  updateJob,
} from "./controllers/jobs.js";
import { getCompanyById } from "./controllers/company.js";

export const resolvers = {
  Mutation: {
    createJob: (root, { input: { title, description } }, { user }) => {
      if (!user) {
        throwUnauthenicated(`Зарыг үүсгэхийн тулд та логин хийсэн байх ёстой!`);
      }
      return createJob(user.companyId, title, description);
    },
    deleteJob: async (root, { id }, { user }) => {
      if (!user) {
        throwUnauthenicated(`Зарыг устгахын тулд та логин хийсэн байх ёстой!`);
      }

      // Өөр компаны зарыг устгах гэж оролдож буй эсэхийг давхар шалгана
      let job = null;
      try {
        job = await deleteJob(id, user.companyId);
      } catch (error) {
        throwNotFoundError(error.message);
      }

      return job;
    },
    updateJob: async (
      root,
      { input: { id, title, description } },
      { user }
    ) => {
      if (!user) {
        throwUnauthenicated(
          `Зарыг засварлахын тулд та логин хийсэн байх ёстой!`
        );
      }
      let job = null;
      try {
        job = await updateJob({
          id,
          companyId: user.companyId,
          title,
          description,
        });
      } catch (error) {
        throwNotFoundError(error.message);
      }
      return job;
    },
  },

  Query: {
    jobs: () => getJobs(),
    job: async (root, { id }) => {
      const job = await getJobById(id);
      if (!job) throwNotFoundError(`${id} id-тэй зар олдсонгүй!`);
      return job;
    },
    company: async (root, { id }) => {
      const company = await getCompanyById(id);
      if (!company) throwNotFoundError(`${id} id-тэй компани олдсонгүй!`);
      return company;
    },
  },

  Company: {
    jobs: (root) => getJobsByCompanyId(root.id),
  },

  Job: {
    date: (root) => root.createdAt.slice(0, "yyyy-mm-dd".length),
    // company: (root) => getCompanyById(root.companyId),
    company: (root, args, { companyLoader }) =>
      companyLoader.load(root.companyId),
  },
};

function throwNotFoundError(message) {
  throw new GraphQLError(message, {
    extensions: { code: "BAD_USER_INPUT" },
  });
}

function throwUnauthenicated(message) {
  throw new GraphQLError(message, {
    extensions: { code: "UNAUTHENTICATED" },
  });
}
