import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://learnio-server.vercel.app" }),
  tagTypes: ["Users", "Teachers", "Courses", "Enrollments","Payments"],
  endpoints: () => ({}),
});

export default baseApi;
