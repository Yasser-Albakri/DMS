const express = require("express");
const subBranchController = require("./../controllers/subBranchController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, subBranchController.getAllSubBranches)
  .post(authController.protect, subBranchController.createSubBranch);
router
  .route("/:id")
  .get(authController.protect, subBranchController.getSubBranch)
  .patch(authController.protect, subBranchController.updateSubBranch);

module.exports = router;
