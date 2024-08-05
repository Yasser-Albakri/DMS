const client = require("./../config/db");
const AppError = require("./../utils/appError");

exports.getCardsBySection = async (section_id) => {
  try {
    const result = await client.query(
      `select * from acc_info  where section_id = $1`,
      [section_id]
    );
    const cards = result.rows;
    return cards;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getIncomingBySection = async (section_id) => {
  try {
    const result = await client.query(
      `select * from inc_info  where section_id = $1`,
      [section_id]
    );
    const incoming = result.rows;
    return incoming;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getOutgoingBySection = async (section_id) => {
  try {
    const result = await client.query(
      `select * from out_info where section_id = $1`,
      [section_id]
    );
    const outgoing = result.rows;
    return outgoing;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};

exports.getPermitsBySection = async (section_id) => {
  try {
    const result = await client.query(
      `select * from permits where section_id = $1`,
      [section_id]
    );
    const permits = result.rows;
    return permits;
  } catch (err) {
    return new AppError("Database error: Unable to fetch data", 500);
  }
};
