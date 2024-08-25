import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
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
         //user login
        userLogin: builder.mutation({
          query: (data) => ({
            url: "/user/login",
            method: "POST",
            body: data,
          }),
          invalidatesTags: ["get-all-cars"],
        }),

        //get all cars
        getAllCars: builder.query({
          query: (arg) => `/user/get/all/cars`,
          method: "GET",
          providesTags: ["get-all-cars"],
        }),

        //rent car
        pickCar: builder.mutation({
          query: (data) => ({
            url: "/user/rent/car",
            method: "POST",
            body: data,
          }),
          invalidatesTags: ["get-all-cars"],
        }),
    }),
});


export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useGetAllCarsQuery,
    usePickCarMutation,
} = apiSlice;