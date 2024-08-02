const client = require("./../config/db");
const AppError = require("./../utils/appError");

exports.getPermits = async () => {
  try {
    const result = await client.query("SELECT * FROM permits");
    const users = result.rows;
    return users;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getPermitById = async (id) => {
  try {
    const result = await client.query("SELECT * FROM permits  WHERE id = $1", [
      id,
    ]);
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError(
      "Database error: Unable to fetch data by permit_id",
      500
    );
  }
};

exports.getPermitByCard = async (id) => {
  try {
    const result = await client.query(
      "SELECT * FROM permits WHERE card_id = $1",
      [id]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by card_id", 500);
  }
};

exports.getRenwal = async () => {
  console.log("Starting to fetch data");
  try {
    const result = await client.query("SELECT * FROM renewal");
    const users = result.rows;
    return users;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getRenwalById = async (id) => {
  try {
    const result = await client.query("SELECT * FROM renewal WHERE id = $1", [
      id,
    ]);
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError(
      "Database error: Unable to fetch data by renewal_id",
      500
    );
  }
};

exports.getRenwalByPermit = async (id) => {
  try {
    const result = await client.query(
      "SELECT * FROM renewal WHERE inc_id = $1",
      [id]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError(
      "Database error: Unable to fetch data by renewal_id",
      500
    );
  }
};

exports.createRenewal = async (data) => {
  try {
    const { inc_id, date, number, user_id, topic, is_renewal } = data;
    const result = await client.query(
      `INSERT INTO  "IBA" (inc_id, date, number, user_id,topic,is_renewal) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *`,
      [inc_id, date, number, user_id, topic, is_renewal]
    );
    return result.rows;
  } catch (err) {
    return new AppError(
      "Database error: Unable to create renewal " + err.message,
      500
    );
  }
};
