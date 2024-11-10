const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      typr: String,
      required: true,
    },
    phone: {
      typr: String,
      required: true,
    },
    email: {
      typr: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
