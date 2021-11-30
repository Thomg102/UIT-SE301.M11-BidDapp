const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transferSchema = new schema({
  tokenId: Number,
  oldOwner: String,
  newOwner: String,
  createdDate: { type: Date, default: Date.now() },
});

const Transfer = mongoose.model("Transfer", transferSchema);
module.exports = Transfer;