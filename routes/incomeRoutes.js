const express = require("express");
const incomingController = require("./../controllers/incomingController");

const router = express.Router();

router
  .route("/")
  .get(incomingController.getAllIncomes)
  .post(incomingController.createIncome);

router.route("/in/info").get(incomingController.getAllIncomesInfo);

router
  .route("/:id")
  .get(incomingController.getIncome)
  .patch(incomingController.updateIncome)
  .delete(incomingController.deleteIncome);

module.exports = router;
