const express = require("express");
const approveOfferController = require("../controllers/approveOfferController");

const router = express.Router();

router
  .route("/")
  .get(approveOfferController.getAllApproveOffers);


router
  .route("/:id")
  .get(approveOfferController.getApproveOffer);

module.exports = router;