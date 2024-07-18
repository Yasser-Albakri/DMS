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
    return new AppError("Database error occurred while fetching data", 500);
  }
};

exports.addElement = async (table, data) => {
  try {
    let fields = [];
    let values = [];
    Object.keys(data).forEach((key) => {
      fields.push(`${key}`);
      values.push("'" + data[key] + "'");
    });
    if (fields.length === 0) return new AppError("Invalid data", 400);

    const query =
      "INSERT INTO " +
      table +
      " (" +
      fields.join(",") +
      ") VALUES (" +
      values.join(",") +
      ") RETURNING *";
    console.log(query);
    const result = await client.query(query);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    return new AppError(err.message || "Database error occurred", 500);
  }
};

exports.updateElement = async (table, id, data) => {
  try {
    let sub = [];
    let query = "UPDATE " + table + " SET ";
    Object.keys(data).forEach((key, index) => {
      sub.push(`${key}='${data[key]}'`);
    });
    sub.join(",");
    query += sub + " WHERE id = " + id + " RETURNING *";
    const result = await client.query(query);
    return result.rows[0];
  } catch (err) {
    return new AppError(err.message || "Database error occurred", 500);
  }
};

exports.deleteElement = async (table, id) => {
  try {
    const result = await client.query(
      `UPDATE ${table} SET is_deleted = true WHERE id = ${id} RETURNING *`
    );
    return result.rowCount;
  } catch (err) {
    return new AppError(err.message || "Database error occurred", 500);
  }
};
