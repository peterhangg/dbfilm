const express = require("express");
const router = express.Router();

// User Model
const User = require("../models/User");

// Middleware
const auth = require("../middleware/auth");

/*
  @route  GET api/favourite
  @desc   Fetch user's favourite movies
  @access private  
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const favouriteMovies = user.favouriteMovies;

    return res.status(200).json(favouriteMovies);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}); 


/*
  @route  POST api/favourite
  @desc   Add a movie favourite to user
  @access private  
*/
router.post("/", auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.id);

  // movieData is the entire movieDetails state 
  const movieData = req.body;
  const addedMovieId = parseInt(movieData.id, 10);
  const movieIds = user.favouriteMovies.map(movie => movie.id);

  if(movieIds.includes(addedMovieId)) throw Error("This movie is already saved in your favourites!");

  const dbUpdate = await User.updateOne(
    { _id: user.id },
    { $addToSet: { favouriteMovies: movieData } }
    );

  if (dbUpdate) {
    return res.status(200).json(movieData);
  }

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/*
  @route  DELETE api/favourite:id
  @desc   remove a favourite movie
  @access private  
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = parseInt(req.params.id, 10);

    // Remove the movie obj in favouriteMovies array
    const dbUpdate = await User.findByIdAndUpdate(
      { _id: user.id },
      { $pull: { favouriteMovies: { id: movieId } } 
    },
      { safe: true, upsert: true }
    );

    if (dbUpdate) {
      return res.status(200).json(movieId);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});



module.exports = router;