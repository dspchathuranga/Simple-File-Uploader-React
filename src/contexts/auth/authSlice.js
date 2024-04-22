import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // token: localStorage.getItem("token"),
    // user: localStorage.getItem("token") ? {
    //   email: jwtDecode(localStorage.getItem("token")).email,
    //   groups: jwtDecode(localStorage.getItem("token"))["cognito:groups"]
    // } : null,

    token: null,
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logOut: (state, action) => {
      state.token = null;
      state.user = null;
      // localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
