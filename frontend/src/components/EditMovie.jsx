import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EditMovie = () => {
  const { id } = useParams(); // Отримання ID фільму з URL
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token); // Отримання токену з Redux
  const [movie, setMovie] = useState({
    image: "",
    title: "",
    rating: 0,
    description: "",
    actors: [],
    director: "",
    genre: [],
    releaseDate: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value ? value.split(",").map((item) => item.trim()) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/movies/${id}`, movie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`/api/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/");
      } catch (error) {
        console.error("Failed to delete movie:", error);
        setIsDeleting(false);
      }
    }
  };

  if (isDeleting) {
    return <div>Deleting...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={movie.image || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={movie.rating || 0}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={movie.description || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="actors" className="block text-gray-700">
            Actors (comma separated)
          </label>
          <input
            type="text"
            id="actors"
            name="actors"
            value={movie.actors ? movie.actors.join(", ") : ""}
            onChange={handleArrayChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="director" className="block text-gray-700">
            Director
          </label>
          <input
            type="text"
            id="director"
            name="director"
            value={movie.director || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700">
            Genre (comma separated)
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre ? movie.genre.join(", ") : ""}
            onChange={handleArrayChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="releaseDate" className="block text-gray-700">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate ? movie.releaseDate.split("T")[0] : ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Movie
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4 ml-4"
        >
          Delete Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
