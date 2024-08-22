// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  bookmarks: [],
  favorites: [],
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter((bookmark) => bookmark !== action.payload);
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((favorite) => favorite !== action.payload);
    },
  },
});

export const {
  setEmail,
  setPassword,
  setBookmarks,
  setFavorites,
  setToken,
  addBookmark,
  removeBookmark,
  addFavorite,
  removeFavorite,
} = userSlice.actions;

export default userSlice.reducer;
