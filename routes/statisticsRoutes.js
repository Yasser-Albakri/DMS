const express = require("express");
const authController = require("./../controllers/authController");
const statisticsController = require("./../controllers/statisticsController");
const router = express.Router();

router.route("/").get(statisticsController.getReports);

module.exports = router;
