const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const generalModel = require("./../models/generalModel");
const upload = require("./../config/multerConfig");

exports.getAllAttachedDocuments = catchAsync(async (req, res, next) => {
  try {
    const attachedDocuments = await generalModel.viewTable('"IBA"');
    if (attachedDocuments.length === 0) {
      return next(new AppError("No attached documents found", 404));
    }
    res.status(200).json({
      status: "success",
      length: attachedDocuments.length,
      data: {
        attachedDocuments,
      },
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to fetch attached documents", 500));
  }
});

exports.getAttachedDocument = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const attachedDocument = await generalModel.viewTable(
      '"IBA"',
      `id  = ${id}`
    );
    if (attachedDocument.length === 0) {
      return next(new AppError("No attached document found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        attachedDocument,
      },
    });
  } catch (error) {
    next(new AppError("Failed to fetch attached document", 500));
  }
});

exports.createAttachedDocument = catchAsync(async (req, res, next) => {
  try {
    upload.single("document")(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      const data = req.body;
      if (req.file) {
        data.file_path = req.file.path;
      }
      const attachedDoc = await generalModel.addElement('"IBA"', data);
      res.status(201).json({
        status: "success",
        data: {
          attachedDoc,
        },
      });
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Error creating attachedDoc", 500));
  }
});

exports.updateAttachedDocument = catchAsync(async (req, res, next) => {
  try {
    upload.single("attachedDocument")(req, res, async (err) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      const id = req.params.id;
      const data = req.body;

      const attachedDoc = await generalModel.viewTable('"IBA"', `id=${id}`);
      if (attachedDoc.length === 0) {
        return next(new AppError("No attached found with that ID", 404));
      }
      if (req.file) {
        data.file_path = req.file.path;
      }
      const newAttachedDoc = await generalModel.updateElement(
        '"IBA"',
        id,
        data
      );
      res.status(200).json({
        status: "success",
        data: {
          newAttachedDoc,
        },
      });
    });
  } catch (error) {
    next(new AppError("Failed to update attached document", 500));
  }
});

exports.deleteAttachedDocument = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const attachedDocument = await generalModel.viewTable(
      "attached_documents",
      `id  = ${id}`
    );
    if (attachedDocument.length === 0) {
      return next(new AppError("No attached document found", 404));
    }

    await generalModel.deleteElement("attached_documents", id);
    res.status(204).json({
      status: "success",
      message: "Attached document deleted successfully",
    });
  } catch (error) {
    next(new AppError("Failed to delete attached document", 500));
  }
});
