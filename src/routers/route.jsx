import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
        {
            path: "/",
            element: <Home />
        }
    ]
  },
]);

export default router;
