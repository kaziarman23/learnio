import baseApi from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    // Post (create) a user
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

// having undefined || buged found
export const { useGetUsersQuery, usePostUsersMutation } = usersApi;
export default usersApi;

console.log({ useGetUsersQuery, usePostUsersMutation });
