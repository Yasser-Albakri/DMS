const express = require("express");
const outgoingController = require("./../controllers/outgoingController");

const router = express.Router();

router
  .route("/")
  .get(outgoingController.getAllOutgoing)
  .post(outgoingController.createOutgoing);

router.route("/out/info").get(outgoingController.getAllOutgoingInfo);

router
  .route("/:id")
  .get(outgoingController.getOutgoing)
  .patch(outgoingController.updateOutgoing)
  .delete(outgoingController.deleteOutgoing);

module.exports = router;
