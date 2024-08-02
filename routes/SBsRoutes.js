const express = require("express");
const SBsController = require("../controllers/SBsController");
const router = express.Router();

router.route("/").get(SBsController.getAllSBs);
router.route("/:id").get(SBsController.getSbs);

module.exports = router;
