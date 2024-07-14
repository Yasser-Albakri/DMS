const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generalModel = require("./../models/generalModel");

exports.getAllCards = catchAsync(async (req, res, next) => {
  try {
    const cards = await generalModel.viewTable("acc_info");
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

exports.getCard = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  try {
    const card = await generalModel.viewTable("acc_info", `id = ${id}`);
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

exports.createCard = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    const card = await generalModel.addElement("account_card", data);
    res.status(201).json({
      status: "success",
      length: card.length,
      data: {
        card,
      },
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error creating card", 500));
  }
});

exports.updateCard = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const card = await generalModel.viewTable("account_card", `id=${id}`);
    if (!card) {
      return next(new AppError("No card found with that ID", 404));
    }

    const newCard = await generalModel.updateElement("account_card", id, data);

    res.status(200).json({
      status: "success",
      length: card.length,
      data: {
        newCard,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving card", 500));
  }
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  try {
    const card = await generalModel.viewTable("account_card", `id=${id}`);
    if (!card) {
      return next(new AppError("No card found with that ID", 404));
    }
    await generalModel.deleteElement("account_card", `id=${id}`);
    res.status(204).json({
      status: "success",
      length: card.length,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error deleting card", 500));
  }
});
