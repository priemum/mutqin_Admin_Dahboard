import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/loginSlice";
import apiReducer from "../slices/apiSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    api: apiReducer,
  },
});

export default store;
