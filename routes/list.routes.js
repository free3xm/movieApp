const { Router } = require("express");
const router = Router();
const MoviesLists = require("../models/MoviesLists");
const Movie = require("../models/Movie");

router.get("/lists/:list/:page", async (req, res) => {
  try {
    console.log(req.params);
    let data = await MoviesLists.findOne({ listName: req.params.list });
    res.json({ [req.params.list]: [data.list[req.params.page].results] });
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
