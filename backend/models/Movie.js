import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  image: String,
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: String,
  actors: [String],
  director: String,
  genre: [String],
  releaseDate: Date,
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
