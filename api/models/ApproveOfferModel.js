const mongoose = require("mongoose");
const schema = mongoose.Schema;

const approveOfferSchema = new schema({
  tokenId: Number,
  oldOwner: String,
  newOwner: String,
  index: Number,
  createdDate: { type: Date, default: Date.now() },
});

const ApproveOffer = mongoose.model("ApproveOffer", approveOfferSchema);
module.exports = ApproveOffer;