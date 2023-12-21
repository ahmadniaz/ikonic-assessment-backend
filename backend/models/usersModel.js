const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a title "],
    },
    email: {
      type: String,
      required: [true, "Please enter a description "],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", usersSchema);
