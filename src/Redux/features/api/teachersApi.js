import baseApi from "./baseApi";

const teachersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers",
      providesTags: ["Teachers"],
    }),
    postTeachers: builder.mutation({
      query: (teacherInfo) => ({
        url: "/teachers",
        method: "POST",
        body: teacherInfo,
      }),
      invalidatesTags: ["Users", "Teachers"],
    }),
    updateAcceptTeachers: builder.mutation({
      query: (id) => ({
        url: `/teachers/accept/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Teachers"],
    }),
    updateRejectTeachers: builder.mutation({
      query: (id) => ({
        url: `/teachers/reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  usePostTeachersMutation,
  useUpdateAcceptTeachersMutation,
  useUpdateRejectTeachersMutation,
} = teachersApi;

export default teachersApi;
