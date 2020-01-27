const { Router } = require("express");
const router = Router();
const MoviesLists = require("../models/MoviesLists");
const Movie = require("../models/Movie");

router.get("/lists/now_playing", async (req, res) => {
  try {
    let data = await MoviesLists.findOne({ listName: "now_playing" });
    res.json(data.list[0]);
  } catch (e) {
    console.log(e);
  }
});

router.get("/get_movie/:id", async (req, res) => {
  try {
    const data = await Movie.findOne({ movieId: req.params.id });
    res.json(data.movie);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
