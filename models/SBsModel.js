const client = require("./../config/db");
const AppError = require("./../utils/appError");

exports.getAll = async () => {
  try {
    const result = await client.query("SELECT * FROM sbs");
    const users = result.rows;
    return users;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getDataBySub = async (id) => {
  try {
    const result = await client.query("SELECT * FROM sbs WHERE sub_id = $1", [
      id,
    ]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data by sub_id", 500);
  }
};
exports.getAllBranch = async (id) => {
  try {
    const result = await client.query(
      "select distinct section, branch_name from sbs WHERE branch_id = $1",
      [id]
    );
    const users = result.rows;
    return users;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.createBranch = async (user) => {
  try {
    const { name, section } = user;
    const result = await client.query(
      "INSERT INTO branch (name, sction) VALUES ($1, $2) RETURNING *",
      [name, section]
    );
    const newUser = result.rows[0];
    return newUser;
  } catch (err) {
    return new AppError("Database error: Unable to create user", 500);
  }
};

exports.createSub = async (user) => {
  try {
    const { name, branch } = user;
    const result = await client.query(
      "INSERT INTO sub_branch (name, branch) VALUES ($1, $2) RETURNING *",
      [name, branch]
    );
    const newUser = result.rows[0];
    return newUser;
  } catch (err) {
    return new AppError("Database error: Unable to create user", 500);
  }
};
