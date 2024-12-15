import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/Api/baseApi";
import userSlice from "./features/userSlice";
import usersApi from "./features/Api/usersApi";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(usersApi.middleware),
});
