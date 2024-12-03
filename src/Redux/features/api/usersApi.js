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
  }),
});

export const { useGetUsersQuery, usePostUsersMutation } = usersApi;
export default usersApi;
