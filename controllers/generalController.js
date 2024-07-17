const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generalModel = require("./../models/generalModel");

exports.getAllCount = catchAsync(async (req, res, next) => {
  try {
    const cards = await generalModel.view("select * from count_type");
    res.status(200).json({
      status: "success",
      length: cards.length,
      data: {
        cards,
      },
    });
  } catch (err) {
    return next(new AppError("Error retrieving cards", 500));
  }
});

exports.getCount = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  try {
    const card = await generalModel.view(
      `select * from count_type where name='${id}'`
    );
    if (!card) {
      return next(new AppError("No card found with that ID", 404));
    }
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
    const cards = await generalModel.view(
      `SELECT id,
    subject,TRUE AS "OI"
    FROM outgoing
    UNION ALL
    SELECT id,
    topic,FALSE
    FROM incoming`
    );
    res.status(200).json({
      status: "success",
      length: cards.length,
      data: {
        cards,
      },
    });
  } catch (err) {
    return next(new AppError("Error retrieving cards", 500));
  }
});
