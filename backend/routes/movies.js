import express from "express";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware для аутентифікації
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/create", authenticate, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { title, sortBy } = req.query;
    const query = title ? { title: { $regex: title, $options: "i" } } : {};
    const movies = await Movie.find(query).sort(sortBy ? { [sortBy]: 1 } : {});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/bookmark", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.bookmarks.push(req.params.id);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/favorite", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favorites.push(req.params.id);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id/bookmark", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.bookmarks = user.bookmarks.filter(
      (movieId) => movieId.toString() !== req.params.id
    );
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id/favorite", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter(
      (movieId) => movieId.toString() !== req.params.id
    );
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
