const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  "99popularity": { type: Number },
  director: { type: String, required: true },
  genre: [{ type: String }],
  imdb_score: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Movie", schema);
