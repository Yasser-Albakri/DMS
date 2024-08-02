const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const paramsModel = require("./../models/permitsModel");

exports.getAllParams = catchAsync(async (req, res, next) => {
  try {
    const params = await paramsModel.getPermits();
    if (params.status === "error") {
      return next(new AppError("Error 1 !", 404));
    }
    console.log(params.length);
    res.status(200).json({
      status: "success",
      length: params.length,
      data: {
        params,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});

exports.getParamById = catchAsync(async (req, res, next) => {
  try {
    const param = await paramsModel.getPermitById(req.params.id);

    if (param.status === "error") {
      return next(new AppError("Error 2 !", 404));
    }
    if (param.length === 0) {
      return next(new AppError("No data found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        param,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});

exports.getParamByCard = catchAsync(async (req, res, next) => {
  try {
    const param = await paramsModel.getPermitByCard(req.params.id);
    if (param.status === "error") {
      return next(new AppError("Error 3!", 404));
    }
    if (param.length === 0) {
      return next(new AppError("No data found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        param,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});

exports.getRenewals = catchAsync(async (req, res, next) => {
  try {
    const renewals = await paramsModel.getRenwal();
    if (renewals.status === "error") {
      return next(new AppError("what  4!", 404));
    }
    res.status(200).json({
      status: "success",
      length: renewals.length,
      data: {
        renewals,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});

exports.getRenewalById = catchAsync(async (req, res, next) => {
  try {
    const renewal = await paramsModel.getRenwalById(req.params.id);
    if (renewal.status === "error") {
      return next(new AppError("Error 5!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        renewal,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});

exports.getRenewalByPermit = catchAsync(async (req, res, next) => {
  try {
    const renewal = await paramsModel.getRenwalByPermit(req.params.id);
    if (renewal.status === "error") {
      return next(new AppError("Error 6!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        renewal,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});

exports.createRenewal = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    const renewal = await paramsModel.createRenewal(data);
    if (renewal.status === "error") {
      return next(new AppError("Worng id !", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        renewal,
      },
    });
  } catch (err) {
    return next(new AppError(`Error retrieving params ${err.message}`, 500));
  }
});
