const express = require("express");
const router = express.Router();

// User Model
const User = require("../models/User");

// Middleware
const auth = require("../middleware/auth");

/*
  @route POST api/favourite
  @desc  Add a movie favourite to user
  @access private  
*/
router.post("/", auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.id);
  console.log("THIS IS THE USER DATA ===> ", user);
  
  // movieData is an object that contains the movie id, title, release date, genres, runtime and score
  const movieData = req.body;
  console.log("THIS IS THE MOVIE DATA SENT TO MONGO ===> ", movieData);
  const dbUpdate = await User.update(
    { _id: user.id },
    { $addToSet: { favouriteMovies: movieData } }
    );
    res.status(200).json(dbUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;