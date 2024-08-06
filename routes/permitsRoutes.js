const express = require("express");
const authController = require("./../controllers/authController");
const permitsController = require("./../controllers/permitsController");
const router = express.Router();

router.route("/").get(permitsController.getAllParams);

router
  .route("/section/:section_id")
  .get(authController.protect, permitsController.getAllPermitsBySection);

router
  .route("/:id")
  .get(permitsController.getParamById)
  .post(permitsController.getParamByCard);

module.exports = router;
