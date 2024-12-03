import baseApi from "./baseApi";

const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: ["Courses"],
    }),
  }),
});


export const { useGetCoursesQuery, useGetCourseQuery } = coursesApi;
export default coursesApi;
