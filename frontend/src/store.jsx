import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
// import moviesReducer from "./features/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // movies: moviesReducer,
  },
});
