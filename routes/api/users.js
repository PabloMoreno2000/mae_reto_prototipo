const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

// @route  POST api/users
// @desct  Creates User
// @access public
router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ matricula });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "Usuario ya existe" }] });
    }

    let user = {};
    user.matricula = req.body.matricula;
    user.password = req.body.password;
    user.campus = req.body.campus;
    user.isMae = req.body.isMae;
    if (user.isMae) {
      user.maeInfo = req.body.maeInfo;
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save user in the database
    const newUser = new User(user);
    await newUser.save();

    // Send a jwt for the new user
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
