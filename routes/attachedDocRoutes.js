const express = require("express");
const attachedDocController = require("./../controllers/attachedDocController");
const router = express.Router();

router
  .route("/")
  .get(attachedDocController.getAllAttachedDocuments)
  .post(attachedDocController.createAttachedDocument);

router
  .route("/:id")
  .get(attachedDocController.getAttachedDocument)
  .patch(attachedDocController.updateAttachedDocument)
  .delete(attachedDocController.deleteAttachedDocument);

module.exports = router;
