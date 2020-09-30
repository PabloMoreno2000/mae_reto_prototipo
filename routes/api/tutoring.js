const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const User = require("../../models/User");
const TS = require("../../models/TutoringSession");

// @route  POST api/tutoring
// @desct  Create a tutoring session
// @access Private
router.post("/", auth, async (req, res) => {
  try {
    // the id is the mongo id, NOT the student/tutor id
    const { userIdGives, userIdReceives } = req.body;
    const tutor = await User.findById({ userIdGives });
    const student = await User.findById({ userIdReceives });

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
});

module.exports = router;
