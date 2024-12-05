import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import AuthProvider from "./Provider/AuthProvider";
import Router from "./routers/Route";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </Provider>
);
