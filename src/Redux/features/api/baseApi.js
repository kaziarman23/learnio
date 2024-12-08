import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Users", "Teachers", "Courses", "Enrollments","Payments"],
  endpoints: () => ({}),
});

export default baseApi;
