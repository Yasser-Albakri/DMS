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
      "SELECT * FROM renewal WHERE permit_id = $1",
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
    const { permit_id, date, topic, user_id, number,body,sign1,sign2 } = data;

    const result = await client.query(
      `INSERT INTO  renewals (permit_id, date, topic,user_id, number,body,type) VALUES ($1, $2, $3, $4,$5,$6,$7,$8) RETURNING *`,
      [permit_id, date, topic, user_id, number,body,sign1,sign2]
    );
    return result.rows;
  } catch (err) {
    return new AppError(
      "Database error: Unable to create renewal " + err.message,
      500
    );
  }
};
