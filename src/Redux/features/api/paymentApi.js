import baseApi from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),
    postPayments: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payments",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: ["Payments"],
    }),
    // TODO: have to change the name postPaymentIntent
    postPaymentIntent: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  usePostPaymentsMutation,
  usePostPaymentIntentMutation,
} = paymentApi;
