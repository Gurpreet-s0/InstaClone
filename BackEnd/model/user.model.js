const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exist"],
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select: false,
  },
  bio: String,
  followers: Number,

  profilePic: {
    type: String,
    default:
      "https://ik.imagekit.io/guri/137420f5b9c39bc911e472f5d20f053e.webp",
  },
});

const userModal = mongoose.model("User Details", userSchema);

module.exports = userModal;
