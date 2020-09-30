const express = require("express");
const router = express.Router();

// @route  POST api/users
// @desct  Creates User
// @access public
router.post("/mae", async (req, res) => {
  try {
    let user = {};
    user.matricula = req.body.matricula;
    user.password = req.body.password;
    user.campus = req.body.campus;
    user.isMae = req.body.isMae;
    if (user.isMae) {
      user.maeInfo = req.body.maeInfo;
    }

    const newUser = new User(user);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
