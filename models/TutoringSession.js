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
  hasBeenAccepted: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  // This info is set when accepting the session
  subject: {
    type: String,
  },
  theme: {
    type: String,
  },
});

module.exports = TutoringSession = mongoose.model(
  "tutoringsession",
  TutoringSessionSchema
);
