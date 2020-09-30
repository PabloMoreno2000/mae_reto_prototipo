const express = require("express");
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

module.exports = router;
