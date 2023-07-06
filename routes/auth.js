const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Abhishekwd@123456789";

// Route1: create a user using :POST "/api/auth/createuser".no require login
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password musty be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors return bad  request and errors
    const errors = validationResult(req);
    let success= false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // check Wheter the user with same email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const securePw = await bcrypt.hash(req.body.password, salt);
      // Create New user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePw,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authTocken = jwt.sign(data, JWT_SECRET);

      success= true;
      //   res.json(user);
      res.json({ success, authTocken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route2: Authenticate a user using :POST "/api/auth/login".no require login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors return bad  request and errors
    const errors = validationResult(req);
    let success= false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      success= true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route3: Get loged in user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
