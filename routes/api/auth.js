const express = require("express");
const router = express.Router();
const Mae = require("../../models/Mae");
const Student = require("../../models/Student");

// By now this is a prototype, we'll be working just with one user
let currentUser = {};
let isMae = false;

// @route  POST api/auth
// @desct  Authenticate user & save the info
// @access Public/non-authentication/no-token
router.post("/", async (req, res) => {
  try {
    const { matricula, password } = req.body;
    let user = await Mae.findOne({ matricula });
    if (user) {
      isMae = true;
    } else {
      user = await Student.findOne({ matricula });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      isMae = false;
    }

    if (password == user.password) {
      currentUser = user;
      const payload = {
        user,
        isMae,
      };
      res.send(payload);
    } else {
      res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get info of authenticated user
router.get("/", (req, res) => {
  res.send({
    user,
    isMae,
  });
});

module.exports = router;
