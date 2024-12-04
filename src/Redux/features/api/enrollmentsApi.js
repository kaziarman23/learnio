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
  }),
});

export const { useGetEnrollmentsQuery, usePostEnrollmentsMutation } =
  enrollmentsApi;
