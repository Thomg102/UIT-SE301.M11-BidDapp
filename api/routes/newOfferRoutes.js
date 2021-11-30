const express = require("express");
const newOfferController = require("../controllers/newOfferController");

const router = express.Router();

router
  .route("/")
  .get(newOfferController.getAllNewOffers);

router
  .route("/:id")
  .get(newOfferController.getNewOffer);

module.exports = router;