import baseApi from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    acceptUserForTeacher: builder.mutation({
      query: (userInfo) => ({
        url: "/users/promote-to-teacher",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    rejectUserForTeacher: builder.mutation({
      query: (userInfo) => ({
        url: "/users/demote-from-teacher",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    promoteUserRole: builder.mutation({
      query: (id) => ({
        url: `/users/promoteUser/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    demoteUserRole: builder.mutation({
      query: (id) => ({
        url: `/users/demoteUser/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserProfileMutation,
  useAcceptUserForTeacherMutation,
  useRejectUserForTeacherMutation,
  usePromoteUserRoleMutation,
  useDemoteUserRoleMutation,
  useDeleteUserMutation,
} = usersApi;
export default usersApi;
