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
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const { useGetTeachersQuery, usePostTeachersMutation } = teachersApi;
export default teachersApi;
