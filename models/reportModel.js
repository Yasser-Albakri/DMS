const client = require("./../config/db");
const AppError = require("./../utils/appError");

exports.getReports = async () => {
  try {
    const result = await client.query("SELECT * FROM reports");
    const users = result.rows;
    return users;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getReportByName = async (name) => {
  try {
    const result = await client.query(
      "SELECT * FROM reports  WHERE name LIKE $1",
      [name]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by name", 500);
  }
};

exports.getReportByNumber = async (num) => {
  try {
    const result = await client.query(
      "SELECT * FROM reports WHERE num LIKE $1",
      [num]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by num", 500);
  }
};

exports.getReportByDate = async (date) => {
  try {
    const result = await client.query(
      "SELECT * FROM reports WHERE dat LIKE $1",
      [date]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by date", 500);
  }
};

exports.getReportByTopic = async (topic) => {
  try {
    const result = await client.query(
      "SELECT * FROM reports WHERE top LIKE $1",
      [topic]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by type", 500);
  }
};

exports.getReportByCreate = async (start, end) => {
  try {
    const result = await client.query(
      "select * from reports where cre between $1 and $2",
      [start, end]
    );
    const user = result.rows;
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by date", 500);
  }
};
