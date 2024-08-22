import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";
import CreateMovieForm from "./components/CreateMovieForm";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import EditMovie from "./components/EditMovie";
import Navbar from "./components/Header";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reg" element={<RegisterForm />} />
          <Route path="/create" element={<CreateMovieForm />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/edit/:id" element={<EditMovie />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
