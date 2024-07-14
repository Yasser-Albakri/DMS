const client = require("../config/db");

exports.viewTable = async (
  table,
  condition = "true",
  column = "*",
  order = "id"
) => {
  const query = `SELECT ${column} FROM ${table} WHERE ${condition} ORDER BY ${order} DESC`;
  const result = await client.query(query);
  const types = result.rows;
  return types;
};

exports.addElement = async (table, data) => {
  let fields = [];
  let values = [];
  Object.keys(data).forEach((key) => {
    fields.push(`${key}`);
    values.push("'" + data[key] + "'");
  });
  if (fields.length == 0) return "Invalid data";
  if (values.length != fields.length)
    return "values and fields not equle in length";
  const query =
    "INSERT INTO " +
    table +
    " (" +
    fields.join(",") +
    ") VALUES (" +
    values.join(",") +
    ") RETURNING *";
  const result = await client.query(query);
  return result.rows;
};

exports.updateElement = async (table, id, data) => {
  let sub = [];
  let query = "UPDATE " + table + " SET ";
  Object.keys(data).forEach((key, index) => {
    sub.push(`${key}='${data[key]}'`);
  });
  sub.join(",");
  query += sub + " WHERE id = " + id + " RETURNING *";
  const result = await client.query(query);
  return result.rows[0];
};

exports.deleteElement = async (table, id) => {
  const result = await client.query(
    `UPDATE ${table} SET is_deleted = true WHERE id = ${id} RETURNING *`
  );
  return result.rowCount;
};
