const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const generalModel = require("./../models/generalModel");

exports.getAllSubBranches = catchAsync(async (req, res, next) => {
  try {
    const subBranch = await generalModel.viewTable("sub_branch");
    res.status(200).json({
      status: "success",
      length: subBranch.length,
      data: {
        subBranch,
      },
    });
  } catch (error) {
    next(new AppError("Failed to get sub_branches", 500));
  }
});

exports.getSubBranch = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const subBranch = await generalModel.viewTable("sub_branch", `id  = ${id}`);
    if (subBranch.length === 0) {
      return next(new AppError("sub_branch not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        subBranch,
      },
    });
  } catch (error) {
    next(new AppError("Failed to get sub_branch", 500));
  }
});

exports.createSubBranch = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    const newSubBranch = await generalModel.addElement("sub_branch", data);
    res.status(201).json({
      status: "success",
      data: {
        newSubBranch,
      },
    });
  } catch (error) {
    next(new AppError("Failed to create sub_branch", 500));
  }
});

exports.updateSubBranch = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const subBranch = await generalModel.viewTable("sub_branch", `id  = ${id}`);
    if (subBranch.length === 0) {
      return next(new AppError("sub_branch not found", 404));
    }
    const updatedSubBranch = await generalModel.updateElement(
      "sub_branch",
      id,
      data
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedSubBranch,
      },
    });
  } catch (error) {
    next(new AppError("Failed to update sub_branch", 500));
  }
});
