const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");

// User Model
const User = require("../models/User");

// @route   POST api/auth
// @desc    Authenticate User (login)
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  };
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "This User does not exist!" });

    // Validate password
    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) throw Error("Invalid credentials!");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
    if (!token) throw Error("Error occurred when signing the token");

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   GET api/auth/user
// @desc    GET user Credentials 
// @access  private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("This User does not exist!");
    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;