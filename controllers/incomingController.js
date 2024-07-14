const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generalModel = require("./../models/generalModel");
const upload = require("./../config/multerConfig");

const nameTable = "incoming";

exports.getAllIncomes = catchAsync(async (req, res, next) => {
  try {
    const incomes = await generalModel.viewTable(nameTable);
    res.status(200).json({
      status: "success",
      length: incomes.length,
      data: {
        incomes,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving incomes", 500));
  }
});

exports.getAllIncomesInfo = catchAsync(async (req, res, next) => {
  try {
    const incomes = await generalModel.viewTable("inc_info");
    res.status(200).json({
      status: "success",
      length: incomes.length,
      data: {
        incomes,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving incomes", 500));
  }
});

exports.getIncome = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const incoming = await generalModel.viewTable(nameTable, `id=${id}`);
    if (incoming.length === 0) {
      return next(new AppError("No incoming found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        incoming,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving incoming", 500));
  }
});

exports.createIncome = catchAsync(async (req, res, next) => {
  try {
    upload.single("document")(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      const data = req.body;
      if (req.file) {
        data.file_path = req.file.path;
      }
      const incoming = await generalModel.addElement("incoming", data);
      res.status(201).json({
        status: "success",
        data: {
          incoming,
        },
      });
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error creating incoming", 500));
  }
});

exports.updateIncome = catchAsync(async (req, res, next) => {
  try {
    upload.single("document")(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      const id = req.params.id;
      const data = req.body;

      const incoming = await generalModel.viewTable("incoming", `id=${id}`);
      if (incoming.length === 0) {
        return next(new AppError("No incoming found with that ID", 404));
      }
      if (req.file) {
        data.file_path = req.file.path;
      }
      const newIncome = await generalModel.updateElement("incoming", id, data);
      res.status(200).json({
        status: "success",
        data: {
          newIncome,
        },
      });
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error updating incoming", 500));
  }
});

exports.deleteIncome = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const incoming = await generalModel.viewTable("incoming", `id=${id}`);
    if (!incoming) {
      return next(new AppError("No incoming found with that ID", 404));
    }
    await generalModel.deleteElement(nameTable, id);
    res.status(204).json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (err) {
    return next(new AppError("Error deleting incoming", 500));
  }
});
