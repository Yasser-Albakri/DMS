const express = require("express");
const authController = require("./../controllers/authController");
const permitsController = require("./../controllers/permitsController");
const router = express.Router();



router
    .route("/")
    .get( permitsController.getRenewals)
    .post( permitsController.createRenewal);

router
    .route("/:id")
    .get( permitsController.getRenewalById)
    .post(permitsController.getRenewalByPermit);
    
module.exports = router;