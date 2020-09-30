const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  campus: {
    type: String,
    required: true,
  },
  isMae: {
    type: Boolean,
    required: true,
  },
  maeInfo: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
});

module.exports = Mae = mongoose.model("user", UserSchema);
