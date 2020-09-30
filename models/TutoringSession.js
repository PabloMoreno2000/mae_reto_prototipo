const mongoose = require("mongoose");

const TutoringSessionSchema = new mongoose.Schema({
  gives: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  receives: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = TutoringSession = mongoose.model(
  "tutoringsession",
  TutoringSessionSchema
);
