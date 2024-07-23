const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const QRCode = require("qrcode");

exports.generateQRCode = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const url = `http://localhost:3000/QrInfo/${id}`;
    const qrCodeDataURL = await QRCode.toDataURL(url);

    res.setHeader("Content-Type", "image/png");
    const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, "");
    const img = Buffer.from(base64Data, "base64");
    res.send(img);
  } catch (err) {
    console.error(err);
    return next(new AppError("Error generating QR code", 500));
  }
});
