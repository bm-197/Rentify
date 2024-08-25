import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
    tagTypes: ["get-all-cars", "get-all-users", "get-history"],
    endpoints: (builder) => ({
        //user signup
        userRegister: builder.mutation({
        query: (data) => ({
            url: "/user/register",
            method: "POST",
            body: data,
        }),
        }),
    }),
});


export const {
    useUserRegisterMutation,
} = apiSlice;