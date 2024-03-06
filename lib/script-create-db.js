import knex from "./db.js";

const { schema } = knex;

try {
  await schema.raw('DROP TABLE IF EXISTS "user" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "manga" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "banner" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "creator" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "creator_manga" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "episode" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "image" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "rating" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "comment" CASCADE');
  await schema.raw('DROP TABLE IF EXISTS "liked" CASCADE');

await schema.createTable("user", (table) => {
  table.text("id").notNullable().primary();
  table.text("email").notNullable();
  table.text("username").notNullable();
  table.text("password").notNullable();
});

await schema.createTable("manga", (table) => {
  table.text("id").notNullable().primary();
  table.text("genre").notNullable();
  table.text("title").notNullable();
  table.text("description");
  table.text("season").notNullable();
  table.text("author").notNullable();
  table.text("release_date").notNullable();
  table.text("owner").notNullable();
  table.text("rating").notNullable();
  table.text("views").notNullable();
  table.text("like").notNullable();
});

await schema.createTable("banner", (table) => {
  table.text("id").notNullable().primary();
  table.text("manga_id").notNullable().references("id").inTable("manga");
  table.text("url").notNullable();
});

await schema.createTable("creator", (table) => {
  table.text("id").notNullable().primary();
  table.text("username").notNullable();
  table.text("password").notNullable();
  table.text("email").notNullable();
  table.text("bank_account");
});

await schema.createTable("creator_manga", (table) => {
  table.text("id").notNullable().primary();
  table.text("manga_id").notNullable().references("id").inTable("manga");
  table.text("creator_id").notNullable().references("id").inTable("creator");
});

await schema.createTable("episode", (table) => {
  table.text("id").notNullable().primary();
  table.text("manga_id").notNullable().references("id").inTable("manga");
  table.text("title").notNullable();
  table.text("date").notNullable();
  table.text("like").notNullable();
  table.text("cover").notNullable();
  table.text("views").notNullable();
  table.text("rating").notNullable();
});

await schema.createTable("image", (table) => {
  table.text("id").notNullable().primary();
  table.text("episode_id").notNullable().references("id").inTable("episode");
  table.text("url").notNullable();
  table.text("order").notNullable();
});

await schema.createTable("rating", (table) => {
  table.text("id").notNullable().primary();
  table.text("user_id").notNullable().references("id").inTable("user");
  table.text("episode_id").notNullable().references("id").inTable("episode");
  table.text("point").notNullable();
});

await schema.createTable("comment", (table) => {
  table.text("id").notNullable().primary();
  table.text("user_id").notNullable().references("id").inTable("user");
  table.text("episode_id").notNullable().references("id").inTable("episode");
  table.text("text").notNullable();
});

await schema.createTable("liked", (table) => {
  table.text("id").notNullable().primary();
  table.text("user_id").notNullable().references("id").inTable("user");
  table.text("episode_id").notNullable().references("id").inTable("episode");
});


console.log('succesfull')
} catch (error) {
  console.error('Error creating tables:', error);
} finally {
  // Close the database connection
  console.log('done')
}
// await knex.table("company").insert([
//   {
//     id: "FjcJCHJALA4i",
//     name: "Tesla",
//     description:
//       "Дэлхийг улам ногоон болгохын төлөө бид цахилгаан автомашиныг дэлхийд нэвтрүүлнэ.",
//   },
//   {
//     id: "Gu7QW9LcnF5d",
//     name: "Amazon",
//     description:
//       "Амазон компани нь дэлхийн хэмжээнд өөрийн глобаль сүлжээг нэвтрүүлж, олон улсын компаниудад мэргэжлийн сэрвэр infrastructure болон 400+ онлайн сэрвисүүдээр үйлчилгээ үзүүлдэг.",
//   },
// ]);

// await knex.table("job").insert([
//   {
//     id: "f3YzmnBZpK0o",
//     companyId: "FjcJCHJALA4i",
//     title: "Frontend хөгжүүлэгч",
//     description:
//       "Бид React төсөл дээр туршлагатай Frontend хөгжүүлэгч ажилд авна.",
//     createdAt: "2023-07-11T11:18:00.000Z",
//   },
//   {
//     id: "XYZNJMXFax6n",
//     companyId: "FjcJCHJALA4i",
//     title: "Backend хөгжүүлэгч",
//     description:
//       "Бид Node.js болон Express дээр туршлагатай Backend хөгжүүлэгч хайж байна.",
//     createdAt: "2023-07-12T10:25:00.000Z",
//   },
//   {
//     id: "6mA05AZxvS1R",
//     companyId: "Gu7QW9LcnF5d",
//     title: "GraphQL хөгжүүлэгч",
//     description:
//       "Rest api Backend-ийг GraphQL рүү шилжүүлэх туршлагатай хөгжүүлэгч хайж байна.",
//     createdAt: "2023-07-14T11:30:00.000Z",
//   },
//   {
//     id: "ZW1haWwiOiJq",
//     companyId: "Gu7QW9LcnF5d",
//     title: "Docker мэргэжилтэн",
//     description:
//       "Ачаалалтай онлайн шопын сайт аппын backend дээр docker container нэвтрүүлэх мэргэжилтэнг ажилд авна.",
//     createdAt: "2023-07-14T11:30:00.000Z",
//   },
// ]);

// await knex.table("user").insert([
//   {
//     id: "AcMJpL7b413Z",
//     companyId: "FjcJCHJALA4i",
//     email: "mask@tesla.com",
//     password: "123",
//   },
//   {
//     id: "BvBNW636Z89L",
//     companyId: "Gu7QW9LcnF5d",
//     email: "bezos@amazon.com",
//     password: "123",
//   },
// ]);

process.exit();
