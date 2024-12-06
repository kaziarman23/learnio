import baseApi from "./baseApi";

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query({
      query: () => "/enrollments",
      providesTags: ["Enrollments"],
    }),
    postEnrollments: builder.mutation({
      query: (enrollmentInfo) => ({
        url: "/enrollments",
        method: "POST",
        body: enrollmentInfo,
      }),
      invalidatesTags: ["Enrollments", "Courses"],
    }),
    deleteEnrollments: builder.mutation({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enrollments"],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
  usePostEnrollmentsMutation,
  useDeleteEnrollmentsMutation,
} = enrollmentsApi;
