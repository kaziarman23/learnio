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
    postCourses: builder.mutation({
      query: (courseInfo) => ({
        url: "/courses",
        method: "POST",
        body: courseInfo,
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCourses: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  usePostCoursesMutation,
  useDeleteCoursesMutation,
} = coursesApi;
export default coursesApi;
