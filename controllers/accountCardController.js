const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generalModel = require("./../models/generalModel");
const upload = require("./../config/multerConfig");

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
    if (card.length === 0) {
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
    upload.fields([
      { name: "unionFile", maxCount: 1 },
      { name: "idFile", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }

      const data = req.body;
    console.log(data);

      if (req.files) {
        if (req.files["unionFile"]) {
          data.union_path = req.files["unionFile"][0].path;
        }
        else { 
          delete data['unionFile'];
        }
        if (req.files["idFile"]) {
          data.id_path = req.files["idFile"][0].path;
        }
        else {
          delete data['idFile'];
        
        }
      }
      if (!req.files) {
        delete data['unionFile'];
        delete data['idFile'];
      }


      const card = await generalModel.addElement("account_card", data);
      if (card.status === "error")  return next(new AppError("Worng input", 400));
      res.status(201).json({
        status: "success",
        length: card.length,
        data: {
          card,
          "GG": "GG",
        },
      });
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
