const { Schema, model } = require("mongoose");

const schema = new Schema({
  movieId: { type: Number },
  movie: { type: Object }
});

module.exports =  model("Movie", schema)