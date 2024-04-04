// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/url";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ endpoint, params }) => {

    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params, // Pass pagination parameters here
    });

    return response.data;
  }
);

export const updateData = createAsyncThunk(
  "api/updateData",
  async (endpoint, data) => {
    const response = await axios.put(`${baseURL}${endpoint}`, data);
    return response.data;
  }
);

export const updateDatapatch = createAsyncThunk(
  "api/updateDatapatch",
  async ({ endpoint, data }) => {
    const token = localStorage.getItem("token");
    try {
      console.log(data, "dispatch");
      console.log(endpoint,"endpoint form apislice");
      console.log(token);

      const response = await axios.patch(`${baseURL}${endpoint}`, {name:data.name,country:data.country,phone_number:data.phone_number,email:data.email,is_active:data.is_active,is_staff:data.is_staff, password:data.password}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error while making PATCH request:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
);


export const deleteData = createAsyncThunk(
  "api/deleteData",
  async (endpoint) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 0;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        // Handle update data success
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // Handle delete data success
      });
  },
});

export default apiSlice.reducer;
