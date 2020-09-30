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
    },
    major: {
      type: String,
    },
    link: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
});

module.exports = Mae = mongoose.model("user", UserSchema);
