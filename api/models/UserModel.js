const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: String,
  address: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  joinedDate: { type: Date, default: Date.now() },
  avatarImage: { type: String, default: 'https://i.ibb.co/fdJHRwN/download.jpg' }
});

const User = mongoose.model("User", userSchema);
module.exports = User;