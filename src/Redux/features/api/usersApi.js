import baseApi from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    postUsers: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUsers: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePostUsersMutation,
  useUpdateUsersMutation,
} = usersApi;
export default usersApi;
