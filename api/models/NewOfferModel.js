const mongoose = require("mongoose");
const schema = mongoose.Schema;

const newOffterSchema = new schema({
  tokenId: Number,
  amount: Number,
  token20: String,
  bargainer: String,
  signature: String,
  timeout: Number,
  createdDate: { type: Date, default: Date.now() },
});

const NewOffter = mongoose.model("NewOffter", newOffterSchema);
module.exports = NewOffter;