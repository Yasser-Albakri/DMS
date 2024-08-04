const client = require("./../config/db");
const AppError = require("./../utils/appError");

exports.getAllUsers = async () => {
  try {
    const result = await client.query("SELECT * FROM get_user");
    const users = result.rows;
    return users;
  } catch (err) {
    return new AppError("Database error: Unable to fetch users", 500);
  }
};

exports.getUserById = async (id) => {
  try {
    const result = await client.query("SELECT * FROM get_user WHERE id = $1", [
      id,
    ]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch user by ID", 500);
  }
};

exports.getUserByName = async (username) => {
  try {
    const result = await client.query(
      "SELECT * FROM get_user WHERE username LIKE $1",
      [username]
    );
    const user = result.rows[0];
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to fetch user by name", 500);
  }
};

exports.createUser = async (user) => {
  try {
    const { name, username, password, role, who_added } = user;
    const result = await client.query(
      "INSERT INTO users (name, username, password, role, who_added) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, username, password, role, who_added]
    );
    const newUser = result.rows[0];
    return newUser;
  } catch (err) {
    return new AppError("Database error: Unable to create user", 500);
  }
};

exports.updateUser = async (id, data) => {
  try {
    const fields = [];
    const values = [];
    let query = "UPDATE users SET ";

    Object.keys(data).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(data[key]);
    });

    query += fields.join(", ");
    query += ` WHERE id = $${fields.length + 1}`;

    values.push(id);

    const result = await client.query(query, values);
    const user = result.rows[0];
    return user;
  } catch (err) {
    return new AppError("Database error: Unable to update user", 500);
  }
};

exports.deleteUser = async (id) => {
  try {
    const result = await client.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rowCount;
  } catch (err) {
    return new AppError("Database error: Unable to delete user", 500);
  }
};

exports.getAllRoles = async () => {
  try {
    const result = await client.query("SELECT * FROM roles");
    const roles = result.rows;
    return roles;
  } catch (err) {
    return new AppError("Database error: Unable to fetch roles", 500);
  }
};

exports.addRole = async (role) => {
  try {
    const { name } = role;
    const result = await client.query(
      "INSERT INTO roles (name) VALUES ($1) RETURNING *",
      [name]
    );
    const newRole = result.rows[0];
    return newRole;
  } catch (err) {
    return new AppError("Database error: Unable to add role", 500);
  }
};

exports.getRole = async (id) => {
  try {
    const result = await client.query("SELECT * FROM roles WHERE id = $1", [
      id,
    ]);
    const role = result.rows[0];
    return role;
  } catch (err) {
    return new AppError("Database error: Unable to fetch role by ID", 500);
  }
};
