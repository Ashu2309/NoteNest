require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../Middleware/fetchUser");
const secretJWTtoken = process.env.SECRET_KEY;
// creare a user: POST "/api/auth/" .Doesnt req auth
router.post(
  "/createuser",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("name", "Enter valid name").isLength({ min: 2 }),
    body("password", "Password length must be atleast 8 char").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //   res.send("Hello");
    // check validate and respond accordingly
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check user with this email exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Please enter Unique value for email " });
      }
      const salt = await bcrypt.genSalt(10);
      // console.log("salt" + salt);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // console.log(`hash${secPass}`);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secretJWTtoken);

      success = true;
      res.json({ success, user, jwt: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error has been occured");
    }
  }
);

// creare a user: POST "/api/auth/login" .Doesnt req auth - LOGIN
router.post(
  "/login",
  [
    body("email", "Invalid emailId").isEmail(),
    body("password", "You need to give password").exists(),
  ],
  async (req, res) => {
    //validation results after checking email and password
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Data doesn't exists..!!" });
      }

      const comparePasswords = await bcrypt.compare(password, user.password);
      if (!comparePasswords) {
        return res
          .status(400)
          .json({ success, error: "Please provide correct credentials !" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secretJWTtoken);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error has been occured");
    }
  }
);

//FETCH data from jwt -MIDDLEWARE
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error has been occured");
  }
});

module.exports = router;
