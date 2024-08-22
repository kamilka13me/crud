import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movies/");
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie._id}
            to={`/movies/${movie._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {movie.image && (
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-gray-600">Rating: {movie.rating}</p>
              <p className="text-gray-600 truncate">{movie.description}</p>
              <p className="text-gray-600 mt-2">Director: {movie.director}</p>
              <p className="text-gray-600">Actors: {movie.actors.join(", ")}</p>
              <p className="text-gray-600">Genres: {movie.genre.join(", ")}</p>
              <p className="text-gray-600">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
