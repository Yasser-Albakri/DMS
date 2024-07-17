const express = require("express");
const attachedDocController = require("./../controllers/generalController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, attachedDocController.getAllCount)
  .post(authController.protect, attachedDocController.homePage);

router
  .route("/:id")
  .get(authController.protect, attachedDocController.getCount);

module.exports = router;
