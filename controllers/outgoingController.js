const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generalModel = require("./../models/generalModel");
const featuresModel = require("./../models/featuresModel");
const upload = require("./../config/multerConfig");

const nameTable = "outgoing";

exports.getAllOutgoing = catchAsync(async (req, res, next) => {
  try {
    const outgoing = await generalModel.viewTable(nameTable);
    res.status(200).json({
      status: "success",
      length: outgoing.length,
      data: {
        outgoing,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving outgoing", 500));
  }
});

exports.getAllOutgoingBySection = catchAsync(async (req, res, next) => {
  try {
    const { section_id } = req.params;
    const outgoing = await featuresModel.getOutgoingBySection(section_id);
    if (!outgoing) {
      return next(new AppError("No data found for that section", 404));
    }
    res.status(200).json({
      status: "success",
      length: outgoing.length,
      data: {
        outgoing,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving data by section", 500));
  }
});

exports.getAllOutgoingInfo = catchAsync(async (req, res, next) => {
  try {
    const outgoing = await generalModel.viewTable("out_info");
    res.status(200).json({
      status: "success",
      length: outgoing.length,
      data: {
        outgoing,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving outgoing", 500));
  }
});

exports.getOutgoing = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const outgoing = await generalModel.viewTable(nameTable, `id=${id}`);
    if (outgoing.length === 0) {
      return next(new AppError("No outgoing found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        outgoing,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error retrieving outgoing", 500));
  }
});

exports.createOutgoing = catchAsync(async (req, res, next) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      const data = req.body;
      if (req.file) {
        data.file_path = req.file.path;
      }
      const outgoing = await generalModel.addElement("outgoing", data);
      res.status(201).json({
        status: "success",
        data: {
          outgoing,
        },
      });
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error creating outgoing", 500));
  }
});

exports.updateOutgoing = catchAsync(async (req, res, next) => {
  try {
    upload.single("document")(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      const id = req.params.id;
      const data = req.body;

      const outgoing = await generalModel.viewTable("outgoing", `id=${id}`);
      if (outgoing.length === 0) {
        return next(new AppError("No outgoing found with that ID", 404));
      }
      if (req.file) {
        data.file_path = req.file.path;
      }
      const newOutgoing = await generalModel.updateElement(
        "outgoing",
        id,
        data
      );
      res.status(200).json({
        status: "success",
        data: {
          newOutgoing,
        },
      });
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error updating outgoing", 500));
  }
});

exports.deleteOutgoing = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const outgoing = await generalModel.viewTable("outgoing", `id=${id}`);
    if (!outgoing) {
      return next(new AppError("No outgoing found with that ID", 404));
    }
    await generalModel.deleteElement(nameTable, id);
    res.status(204).json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (err) {
    return next(new AppError("Error deleting outgoing", 500));
  }
});
