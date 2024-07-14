const dotenv = require("dotenv");
const { Client } = require("pg");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

const client = new Client({
  connectionString: DB,
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err));

module.exports = client;
