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
    addCourse: builder.mutation({
      query: (courseInfo) => ({
        url: "/courses",
        method: "POST",
        body: courseInfo,
      }),
      invalidatesTags: ["Courses"],
    }),
    updateActiveCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/active/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Courses"],
    }),
    updateRejectCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
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
  useAddCourseMutation,
  useUpdateActiveCourseMutation,
  useUpdateRejectCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
export default coursesApi;
