const express = require("express");
const outgoingController = require("./../controllers/outgoingController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, outgoingController.getAllOutgoing)
  .post(authController.protect, outgoingController.createOutgoing);

router
  .route("/out/info")
  .get(authController.protect, outgoingController.getAllOutgoingInfo);

router
  .route("/section/:section_id")
  .get(authController.protect, outgoingController.getAllOutgoingBySection);

router
  .route("/:id")
  .get(outgoingController.getOutgoing)
  .patch(authController.protect, outgoingController.updateOutgoing)
  .delete(authController.protect, outgoingController.deleteOutgoing);

module.exports = router;
