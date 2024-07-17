const express = require("express");
const attachedDocController = require("./../controllers/attachedDocController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, attachedDocController.getAllAttachedDocuments)
  .post(authController.protect, attachedDocController.createAttachedDocument);

router
  .route("/:id")
  .get(authController.protect, attachedDocController.getAttachedDocument)
  .patch(authController.protect, attachedDocController.updateAttachedDocument)
  .delete(authController.protect, attachedDocController.deleteAttachedDocument);

module.exports = router;
