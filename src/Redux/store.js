import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/Api/baseApi";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
