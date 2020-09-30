const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
// Exporting two objects
//const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route  GET api/maes/getActive
// @desct  Get all active maes
// @access public
router.get("/", async (req, res) => {
  try {
    const activeMaes = await User.find({
      isMae: true,
      "maeInfo.isActive": true,
    }).select("-password");
    res.json(activeMaes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  PUT api/maes/setMyLink
// @desct  Set the link of the authenticated mae
// @access private
router.put("/setMyLink", auth, async (req, res) => {
  try {
    const mae = await User.findById(req.user.id);
    mae.maeInfo.link = req.body.link;
    await mae.save();
    res.json({ msg: "Link changed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
