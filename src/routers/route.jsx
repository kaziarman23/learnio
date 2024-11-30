import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AllCourses from "../pages/AllCourses/AllCourses";
import CourseDetails from "../pages/AllCourses/CourseDetails";
import TeacherEnrollment from "../pages/TeacherEnrollment/TeacherEnrollment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allCourses",
        element: <AllCourses />,
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails />,
      },
      {
        path: "/teacherEnrollment",
        element: <TeacherEnrollment />,
      },
    ],
  },
]);

export default router;
