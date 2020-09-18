const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  synopsis: { type: String, required: true },
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
