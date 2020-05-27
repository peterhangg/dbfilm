const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/User");

// @route   POST api/user
// @desc    Register new User
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields!" });
  };

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "This User already exist!"});

    // Create Hash and Salt
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Error occurred with bcrypt");
    
    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Error occurred when hashing the password");
    
    const newUser = new User({
      name,
      email,
      password: hash
    });
    
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");
    
    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    
    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;