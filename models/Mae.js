const mongoose = require("mongoose");

const MaeSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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
});

module.exports = Mae = mongoose.model("mae", MaeSchema);
