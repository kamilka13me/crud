import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
