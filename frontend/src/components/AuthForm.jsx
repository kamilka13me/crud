import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setPassword,
  setBookmarks,
  setFavorites,
  setToken,
} from "../features/authSlice";

const LoginForm = () => {
  const [email, setEmailInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        dispatch(setToken(token));
        dispatch(setEmail(user.email));
        dispatch(setBookmarks(user.bookmarks));
        dispatch(setFavorites(user.favorites));
        setLogin(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmailInput(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>

      {login ? <div>succse</div> : <div>faile</div>}
    </form>
  );
};

export default LoginForm;
