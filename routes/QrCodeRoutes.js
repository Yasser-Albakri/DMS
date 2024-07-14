const express = require("express");
const qrCodeController = require("./../controllers/qrCodeController");

const router = express.Router();

router.route("/:id").get(qrCodeController.generateQRCode);

module.exports = router;
