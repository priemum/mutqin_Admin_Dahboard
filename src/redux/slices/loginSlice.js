// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { loginUser } = loginSlice.actions;

export default loginSlice.reducer;

// export const loginUserAsync = (logindata) => async (dispatch) => {
//   try {
//     // Make a POST request to the login endpoint
//     const response = await axios.post(baseURLl + `api/user/login/`, logindata);

//     // Assuming the response contains user data
//     const userData = response.data;

//     const tokenKey = userData.tokens.access;
//     localStorage.setItem("token", tokenKey);
//     // Dispatch the successful login action
//     dispatch(loginUser(userData));
//   } catch (error) {
//     console.error("Error posting data:", error);

//     // Dispatch the login error action
//     dispatch(loginError("Invalid email or password"));
//   }
// };

// async function fetchData() {
//   try {
//     const response = await axios.post(
//       baseURLl + `api/user/login/`,
//       action.payload
//     );
//     // Assuming the response contains user data
//     const userData = response.data;
//     const tokenKey = userData.tokens.access;
//     state.user = userData;
//     localStorage.setItem("token", tokenKey);
//     return "success";
//   } catch (error) {
//     console.error("Error posting data:", error);
//     console.log("state.error", error);
//     return error;
//   }
// }
// const datapromise = await fetchData();
// state.user = datapromise;
// console.log("datapromise", datapromise.response.data.detail);
// state.error = datapromise?.response?.data?.detail;
