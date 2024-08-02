const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const general = require("./../config/db");

exports.getAllCount = catchAsync(async (req, res, next) => {
  try {
    const result = await general.query("select * from count_type");
    const cards = result.rows;
    res.status(200).json({
      status: "success",
      length: cards.length,
      data: {
        cards,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving cards", 500));
  }
});

exports.getCount = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await general.query(
      `select * from count_type where name='${id}'`
    );
    if (!result) {
      return next(new AppError("No card found with that ID", 404));
    }
    const card = result.rows;

    res.status(200).json({
      status: "success",
      length: card.length,
      data: {
        card,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving card", 500));
  }
});

exports.homePage = catchAsync(async (req, res, next) => {
  try {
    const result = await general.query(
      `SELECT id,
    subject,TRUE AS "OI"
    FROM outgoing
    UNION ALL
    SELECT id,
    topic,FALSE
    FROM incoming`
    );
    const cards = result.rows;
    res.status(200).json({
      status: "success",
      length: cards.length,
      data: {
        cards,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving cards", 500));
  }
});
