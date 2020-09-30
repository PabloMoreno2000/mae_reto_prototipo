const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @route  POST api/auth
// @desct  Authenticate user & save the info
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    check("matricula", "Favor de ingresar matrícula").exists(),
    check("password", "Favor de ingresar contraseña").exists(),
  ],
  async (req, res) => {
    // The check is done with the second parameter of above within []
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { matricula, password } = req.body;

    try {
      // If there's a user with that id
      let user = await User.findOne({ matricula });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Credenciales inválidas" }] });
      }

      // Check if the hash version of a non-encrypted text equals to a hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Credenciales inválidas" }] });
      }

      const payload = {
        user: {
          id: user.id, // Moongose gets the id of the database
        },
      };

      // Generate a JSON Web Token (encrypted payload with signature)
      jwt.sign(
        payload,
        config.get("jwtSecret"), // encryption key
        { expiresIn: 360000 },
        // Callback
        (err, token) => {
          // If there's an error, throw it
          if (err) throw err;
          // Else, set in the json of the response this web token with
          // the user id that can be used for authentication after sign up
          res.json({ token });
        }
      );

      // res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  GET api/auth
// @desct  Get info of authenticated user
// @access Public/non-authentication/no-token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
