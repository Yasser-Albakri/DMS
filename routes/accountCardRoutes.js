const express = require("express");
const accountCardController = require("./../controllers/accountCardController");
const router = express.Router();

router
  .route("/")
  .get(accountCardController.getAllCards)
  .post(accountCardController.createCard);

router
  .route("/:id")
  .get(accountCardController.getCard)
  .patch(accountCardController.updateCard)
  .delete(accountCardController.deleteCard);

module.exports = router;
