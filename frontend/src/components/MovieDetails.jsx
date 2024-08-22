import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams(); // Отримуємо ID фільму з URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>; // Показуємо лоадер, поки дані завантажуються
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {movie.image && (
          <img src={movie.image} alt={movie.title} className="w-full h-96 object-cover" />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600">Rating: {movie.rating}</p>
          <p className="text-gray-600 mt-2">{movie.description}</p>
          <p className="text-gray-600 mt-2">Director: {movie.director}</p>
          <p className="text-gray-600">Actors: {movie.actors.join(", ")}</p>
          <p className="text-gray-600">Genres: {movie.genre.join(", ")}</p>
          <p className="text-gray-600">
            Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
          </p>
          <Link
            to={`/edit/${movie._id}`}
            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Редагувати
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
