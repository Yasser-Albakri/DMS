const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const SBsModel = require("./../models/SBsModel");

exports.getAllSBs = catchAsync(async (req, res, next) => {
  try {
    const SBs = await SBsModel.getAll();
    if (SBs.length === 0) {
      return next(new AppError("There is no data", 404));
    }
    res.status(200).json({
      status: "success",
      length: SBs.length,
      data: {
        SBs,
      },
    });
  } catch (error) {
    next(new AppError("Failed to get Data", 500));
  }
});

exports.getSbs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const SBs = await SBsModel.getDataBySub(id);
    if (!SBs) {
      return next(new AppError("There is no data", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        SBs,
      },
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to get data", 500));
  }
});

exports.getSectionWithBranch = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const SBs = await SBsModel.getAllBranch(id);
    if (!SBs) {
      return next(new AppError("There is no data", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        SBs,
      },
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to get data", 500));
  }
});
