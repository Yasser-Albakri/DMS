const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const generalModel = require("./../models/generalModel");

exports.getAllBranches = catchAsync(async (req, res, next) => {
  try {
    const branches = await generalModel.viewTable("branch");
    res.status(200).json({
      status: "success",
      length: branches.length,
      data: {
        branches,
      },
    });
  } catch (error) {
    next(new AppError("Failed to get branches", 500));
  }
});

exports.getBranch = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const branch = await generalModel.viewTable("branch", `id  = ${id}`);
    if (branch.length === 0) {
      return next(new AppError("Branch not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        branch,
      },
    });
  } catch (error) {
    next(new AppError("Failed to get branch", 500));
  }
});

exports.createBranch = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const newBranch = await generalModel.addElement("branch", data);
    res.status(201).json({
      status: "success",
      data: {
        newBranch,
      },
    });
  } catch (error) {
    console.log(err);
    next(new AppError("Failed to create branch", 500));
  }
});

exports.updateBranch = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const branch = await generalModel.viewTable("branch", `id  = ${id}`);
    if (branch.length === 0) {
      return next(new AppError("Branch not found", 404));
    }

    const updatedBranch = await generalModel.updateElement("branch", id, data);
    res.status(200).json({
      status: "success",
      data: {
        updatedBranch,
      },
    });
  } catch (error) {
    next(new AppError("Failed to update branch", 500));
  }
});
