import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./auth/authSlice";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://devinvoicemanager.intellimorph.ai/v1/`,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "*/*");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.meta?.response?.status === 401) {
    const token = api.getState().auth.token;

    const refreshResult = await axios.post(
      `${process.env.REACT_APP_AUTH_URL}/v1/auth/tokens:refresh`,
      {
        token: token,
      }
    );

    if (refreshResult?.data?.token) {
      const user = api.getState().auth.user;

      api.dispatch(setCredentials({ token: refreshResult?.data?.token, user }));
      localStorage.setItem("token", refreshResult?.data?.token);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Invoices",
  ],
  endpoints: (builder) => ({}),
});
