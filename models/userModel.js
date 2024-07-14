const client = require("./../config/db");

exports.getAllUsers = async () => {
  const result = await client.query("SELECT * FROM users");
  const users = result.rows;
  return users;
};

exports.getUserById = async (id) => {
  const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = result.rows[0];
  return user;
};

exports.getUserByName = async (username) => {
  const result = await client.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = result.rows[0];
  return user;
};

exports.createUser = async (user) => {
  const {
    name,
    username,
    password,
    role,
    date_of_registration,
    who_added,
    date_added,
  } = user;
  const result = await client.query(
    "INSERT INTO users ( name , username , password , role , who_added ) VALUES ($1, $2, $3 , $4 , $5) RETURNING *",
    [name, username, password, role, who_added]
  );
  const newUser = result.rows[0];
  return newUser;
};

exports.updateUser = async (id, data) => {
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
};

exports.deleteUser = async (id) => {
  const result = await client.query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount;
};

exports.getAllRoles = async () => {
  const result = await client.query("SELECT * FROM roles");
  const roles = result.rows;
  return roles;
};
exports.addRole = async (role) => {
  const { name } = role;
  const result = await client.query(
    "INSERT INTO roles (name) VALUES ($1) RETURNING *",
    [name]
  );
  const newRole = result.rows[0];
  return newRole;
};

exports.getRole = async (id) => {
  const result = await client.query("SELECT * FROM roles WHERE id = $1", [id]);
  const role = result.rows[0];
  return role;
};
