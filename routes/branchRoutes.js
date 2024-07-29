const express = require("express");
const branchController = require("./../controllers/branchController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, branchController.getAllBranches)
  .post(authController.protect, branchController.createBranch);
router
  .route("/:id")
  .get(authController.protect, branchController.getBranch)
  .patch(authController.protect, branchController.updateBranch);

module.exports = router;
