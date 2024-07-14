const catchAsync = require("./../utils/catchAsync");
const userModel = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AppError = require("./../utils/appError");

dotenv.config({ path: "../config.env" });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  try {
    const allUsers = await userModel.getAllUsers();
    res.status(200).json({
      status: "success",
      length: allUsers.length,
      data: {
        allUsers,
      },
    });
  } catch (err) {
    return next(new AppError("Error retrieving users", 500));
  }
});

exports.getMe = catchAsync(async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token" });
    }

    token = token.replace("Bearer ", "");

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    const result = await userModel.getUserById(decoded.id);
    const user = result;

    res.status(200).json({
      success: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error retrieving user", 500));
  }
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving user", 500));
  }
});

exports.updateUser = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await userModel.getUserById(id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const newUser = await userModel.updateUser(id, data);

    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error updating user", 500));
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    await userModel.deleteUser(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error deleting user", 500));
  }
});
