const express = require("express");
const router = express.Router();
// Exporting two objects
//const { check, validationResult } = require("express-validator/check");

const Mae = require("../../models/Mae");

// @route  GET api/maes
// @desct  Get all maes
// @access public
router.get("/", async (req, res) => {
  try {
    const maes = await Mae.find();
    res.json(maes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/* This won't be needed for now
// @route  POST api/maes
// @desct  Create MAE
// @access public
router.post("/", async (req, res) => {
  try {
    /*const {
      matricula,
      password,
      name,
      link,
      isActive
    } = req.body;

    const newMae = new Mae(req.body);
    await newMae.save();
    res.json(newMae);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});*/

module.exports = router;
