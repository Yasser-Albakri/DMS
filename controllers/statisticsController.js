const reportModel = require("../models/reportModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getReports = catchAsync(async (req, res, next) => {
  try {
    const { name, num, date, topic, start, end } = req.query;
    const reports = await reportModel.getReports();
    const byName = await reportModel.getReportByName(name);
    const byNum = await reportModel.getReportByNumber(num);
    const byDate = await reportModel.getReportByDate(date);
    const byTopic = await reportModel.getReportByTopic(topic);
    const byCreate = await reportModel.getReportByCreate(start, end);

    res.status(200).json({
      status: "success",
      data: {
        reports,
        byName,
        byNum,
        byDate,
        byTopic,
        byCreate,
      },
    });
  } catch (err) {
    next(new AppError("Error 1!", 500));
  }
});
