const mongoose = require("mongoose");
const validator = require('validator');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: String,
  key: {
    type: String,
    required: [true, 'User must have key'],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please a provide a valid email'],
  },
  address: { 
    detail: String,
    city: String,
    state: String,
    country: String,
  },
  phone: { type: String, maxlength: [10, 'Phone number must have equal or less than 8 characters'] },
  role: { type: Number, default: 0 }, // 0: client, 1: admin
  joinedDate: { type: Date, default: Date.now() },
  avatarImage: { type: String, default: 'https://i.ibb.co/fdJHRwN/download.jpg' }
});

const User = mongoose.model("User", userSchema);
module.exports = User;