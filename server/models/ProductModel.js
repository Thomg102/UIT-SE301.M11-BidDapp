const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = schema({
  name: { 
    type: String, 
    required: [true, 'Product must have a name'], 
    unique: true 
  },
  description: { type: String, required: [true, 'Product must have a description'] },
  shortDesc: { type: String, required: [true, 'Product must have a short description'] },
  image: { type: String, required: [true, 'Product must have an image'] },
  price: { type: Number, default: 0, required: [true, 'Product must have a price'] },
  createdDate: { type: Date, default: Date.now() },
  isVerifiedCollection: { type: Boolean, default: false },
  isETHOnPolygon: { type: Boolean, default: false },
  endDate: { type: Date, default: 'April 18, 2022 at 10:21am +07' },
  owner: { type: schema.ObjectId, ref: 'User', required: [true, 'Product must be belong to an owner'] },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;