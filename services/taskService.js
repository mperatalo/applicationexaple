import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO tasks (name) VALUES (${ name })`;
};

const findAllNonCompletedTasks = async () => {
  return await sql`SELECT * FROM tasks WHERE completed = false`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM tasks WHERE id = ${ id }`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

export { create, findAllNonCompletedTasks, findById };