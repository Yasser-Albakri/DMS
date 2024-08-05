const express = require("express");
const incomingController = require("./../controllers/incomingController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, incomingController.getAllIncomes)
  .post(authController.protect, incomingController.createIncome);

router
  .route("/in/info")
  .get(authController.protect, incomingController.getAllIncomesInfo);

router
  .route("/section/:section_id")
  .get(authController.protect, incomingController.getAllIncomesBySection);

router
  .route("/:id")
  .get(authController.protect, incomingController.getIncome)
  .patch(authController.protect, incomingController.updateIncome)
  .delete(authController.protect, incomingController.deleteIncome);

module.exports = router;
