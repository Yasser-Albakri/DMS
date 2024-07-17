const jwt = require("jsonwebtoken");
const userModel = require("./../models/userModel");
const AppError = require("./../utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  delete user.password;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await userModel.createUser(data);
    const newUser = result;
    console.log();
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(err);
    return next(new AppError("Error creating user", 500));
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await userModel.getUserByName(username);
    const user = result;

    if (!user || username != user.username || password != user.password) {
      return next(new AppError("username or password", 401));
    }
    createSendToken(user, 200, res);
  } catch (err) {
    console.error(err);
    return next(new AppError("Error logging in", 500));
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const result = await userModel.getUserById(decoded.id);

    if (!result) {
      return next(
        new AppError("The user belonging to this token does not exist.", 401)
      );
    }
    const currentUser = result;
    req.user = currentUser;
    next();
  } catch (err) {
    console.log(err);
    return next(new AppError("Error verifying token.", 401));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.Role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
