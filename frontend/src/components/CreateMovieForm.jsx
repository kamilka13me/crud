import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateMovieForm = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [actors, setActors] = useState([]);
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is missing.");
      console.log(user);
      return;
    }

    const movieData = {
      image,
      title,
      rating,
      description,
      actors,
      director,
      genre,
      releaseDate,
    };

    try {
      console.log(user);
      const response = await axios.post("/api/movies/create", movieData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        navigate("/movies");
      }
    } catch (error) {
      console.error("Failed to create movie:", error);
    }
  };

  const handleActorsChange = (e) => {
    setActors(e.target.value.split(",").map((actor) => actor.trim()));
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value.split(",").map((genre) => genre.trim()));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input fields remain unchanged */}
      <div>
        <label htmlFor="image" className="block text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="rating" className="block text-gray-700">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          min="0"
          max="10"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="actors" className="block text-gray-700">
          Actors (comma-separated)
        </label>
        <input
          type="text"
          id="actors"
          value={actors.join(", ")}
          onChange={handleActorsChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="director" className="block text-gray-700">
          Director
        </label>
        <input
          type="text"
          id="director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="genre" className="block text-gray-700">
          Genre (comma-separated)
        </label>
        <input
          type="text"
          id="genre"
          value={genre.join(", ")}
          onChange={handleGenreChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="releaseDate" className="block text-gray-700">
          Release Date
        </label>
        <input
          type="date"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Movie
      </button>
    </form>
  );
};

export default CreateMovieForm;
