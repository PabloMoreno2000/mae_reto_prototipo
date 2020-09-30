const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const TS = require("../../models/TutoringSession");

// TODO: Change to private, just student(receives) can do this
// TODO: No user can register a session with itself
// @route  POST api/tutoring
// @desct  Create a tutoring session
// @access Public
router.post(
  "/",
  [
    check("userIdGives", "Falta MAE").not().isEmpty(),
    check("userIdReceives", "Falta asesorado").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      // Check for errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      // the id is the mongo id, NOT the student/tutor id
      let { userIdGives, userIdReceives } = req.body;
      const tutor = await User.findById(userIdGives);
      const student = await User.findById(userIdReceives);

      // Both have to exist and tutor has to be a Mae
      if (!tutor || !student || !tutor.isMae) {
        return res.status(400).send("Bad Request");
      }

      // Save the tutoring session and send it in response
      const sessionInfo = {
        gives: userIdGives,
        receives: userIdReceives,
      };
      session = new TS(sessionInfo);
      await session.save();
      res.json(session);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// TODO: Change it to private
// @route  GET api/tutoring/:maeId
// @desct  Get all tutoring sessions from a certain mae
// @access Public
router.get("/:maeId", async (req, res) => {
  try {
    const student = await User.findById(req.params.maeId);
    // have to find something and be a tutor
    if (!student || !student.isMae) {
      return res.status(400).send("Bad Request");
    }

    const sessions = await TS.find({ gives: req.params.maeId });
    res.json(sessions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
