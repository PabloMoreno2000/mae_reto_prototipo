const express = require("express");
const router = express.Router();
// Exporting two objects
//const { check, validationResult } = require("express-validator/check");

const Student = require("../../models/Student");

// @route  GET api/students
// @desct  Get all students
// @access public
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
