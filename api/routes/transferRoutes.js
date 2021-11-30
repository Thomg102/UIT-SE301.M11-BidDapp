const express = require("express");
const transferController = require("../controllers/transferController");

const router = express.Router();

router
  .route("/")
  .get(transferController.getAllTransfers);

router
  .route("/:id")
  .get(transferController.getTransfer);

module.exports = router;