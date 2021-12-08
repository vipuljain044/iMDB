const express = require("express");
const router = express.Router();
const movieService = require("./movie.service");
const {
  addMovieSchema,
  updateMovieSchema,
  deleteMovieSchema,
} = require("./movie.schema");
// const authorize = require('../_middleware/authorize');
// const Role = require('../_helpers/role');

// routes
router.get("/", async (req, res, next) => {
  try {
    const movies = await movieService.getMovies(req.query);
    res.json({ statusCode: 200, message: "Found Movies", movies });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: err,
    });
  }
});

router.post("/", addMovieSchema, async (req, res, next) => {
  try {
    await movieService.addMovie(req.body);
    res.json({ statusCode: 200, message: "Movie Added Successfully" });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: err,
    });
  }
});

router.put("/", updateMovieSchema, async (req, res, next) => {
  try {
    await movieService.updateMovie(req.body);
    res.json({ statusCode: 200, message: "Movie Updated Successfully" });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: err,
    });
  }
});

router.delete("/", deleteMovieSchema, async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.body.id);
    res.json({ statusCode: 200, message: "Movie deleted Successfully" });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: err,
    });
  }
});

module.exports = router;
