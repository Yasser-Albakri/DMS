const client = require("../config/db");
const AppError = require("./../utils/appError");

exports.viewTable = async (
  table,
  condition = "true",
  column = "*",
  order = "id"
) => {
  try {
    const query = `SELECT ${column} FROM ${table} WHERE ${condition} ORDER BY ${order} DESC`;
    const result = await client.query(query);
    const types = result.rows;
    return types;
  } catch (err) {
    console.log(err);
    return new AppError("Database error occurred while fetching data", 500);
  }
};

exports.addElement = async (table, data) => {
  try {
    let fields = [];
    let values = [];
    let placeholders = [];
    let index = 1;

    for (const key in data) {
      fields.push(key);
      values.push(data[key]);
      placeholders.push(`$${index++}`);
    }

    if (fields.length === 0) return new AppError("Invalid data", 400);

    const query = `INSERT INTO ${table} (${fields.join(
      ","
    )}) VALUES (${placeholders.join(",")}) RETURNING *`;
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.log(err);
    return new AppError(err.message || "Database error occurred", 500);
  }
};

exports.updateElement = async (table, id, data) => {
  try {
    let sub = [];
    let values = [];
    let index = 1;

    for (const key in data) {
      sub.push(`${key} = $${index++}`);
      values.push(data[key]);
    }

    values.push(id); // Add the id as the last parameter
    const query = `UPDATE ${table} SET ${sub.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return new AppError(err.message || "Database error occurred", 500);
  }
};

exports.deleteElement = async (table, id) => {
  try {
    const query = `UPDATE ${table} SET is_deleted = true WHERE id = $1 RETURNING *`;
    const result = await client.query(query, [id]);
    return result.rowCount;
  } catch (err) {
    return new AppError(err.message || "Database error occurred", 500);
  }
};
