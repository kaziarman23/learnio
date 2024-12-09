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
    updateActiveEnrollments: builder.mutation({
      query: (id) => ({
        url: `/enrollments/active/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Enrollments"],
    }),
    updateRejectEnrollments: builder.mutation({
      query: (id) => ({
        url: `/enrollments/reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Enrollments"],
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
  useUpdateActiveEnrollmentsMutation,
  useUpdateRejectEnrollmentsMutation,
  useDeleteEnrollmentsMutation,
} = enrollmentsApi;
