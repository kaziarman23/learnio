import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASEURL_SERVER,
  }),
  tagTypes: ["Users", "Teachers", "Courses", "Enrollments", "Payments"],
  endpoints: () => ({}),
});

export default baseApi;
