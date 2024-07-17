const client = require("../config/db");

exports.viewTable = async (
  table,
  condition = "true",
  column = "*",
  order = "id"
) => {
  try {
    const query = `SELECT ${column} FROM ${table} WHERE ${condition} ORDER BY ${order} DESC`;
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error(`Error in viewTable: ${error.message}`);
    throw new Error("Unable to view table");
  }
};

exports.view = async (query) => {
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error(`Error in view: ${error.message}`);
    throw new Error("Unable to execute query");
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
    if (fields.length == 0) throw new Error("Invalid data");
    if (values.length != fields.length)
      throw new Error("Values and fields are not equal in length");

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
  } catch (error) {
    console.error(`Error in addElement: ${error.message}`);
    throw new Error("Unable to add element");
  }
};

exports.updateElement = async (table, id, data) => {
  try {
    let sub = [];
    let query = "UPDATE " + table + " SET ";
    Object.keys(data).forEach((key) => {
      sub.push(`${key}='${data[key]}'`);
    });
    query += sub.join(",") + " WHERE id = " + id + " RETURNING *";

    const result = await client.query(query);
    return result.rows[0];
  } catch (error) {
    console.error(`Error in updateElement: ${error.message}`);
    throw new Error("Unable to update element");
  }
};

exports.deleteElement = async (table, id) => {
  try {
    const result = await client.query(
      `UPDATE ${table} SET is_deleted = true WHERE id = ${id} RETURNING *`
    );
    return result.rowCount;
  } catch (error) {
    console.error(`Error in deleteElement: ${error.message}`);
    throw new Error("Unable to delete element");
  }
};
