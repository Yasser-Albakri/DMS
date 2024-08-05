const express = require("express");
const accountCardController = require("./../controllers/accountCardController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, accountCardController.getAllCards)
  .post(authController.protect, accountCardController.createCard);

router
  .route("/section/:section_id")
  .get(authController.protect, accountCardController.getAllCardsBySections);

router
  .route("/:id")
  .get(authController.protect, accountCardController.getCard)
  .patch(authController.protect, accountCardController.updateCard)
  .delete(authController.protect, accountCardController.deleteCard)
  .post(authController.protect, accountCardController.getCardByUser);

module.exports = router;
