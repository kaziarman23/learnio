import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AllCourses from "../pages/AllCourses/AllCourses";
import CourseDetails from "../pages/AllCourses/CourseDetails";
import TeacherEnrollment from "../pages/TeacherEnrollment/TeacherEnrollment";
import Register from "../pages/Authintication/Register/Register";
import Login from "../pages/Authintication/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Interface from "../pages/Dashboard/Interface";
import StudentProfile from "../pages/Dashboard/StudentDashboard/StudentProfile/StudentProfile";
import UpdateStudentProfile from "../pages/Dashboard/StudentDashboard/StudentProfile/UpdateStudentProfile";
import StudentEnrollments from "../pages/Dashboard/StudentDashboard/StudentEnrollment/StudentEnrollments";
import Payment from "../pages/Dashboard/StudentDashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: (
          <PrivateRoute>
            <AllCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/teacher",
        element: (
          <PrivateRoute>
            <TeacherEnrollment />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/interface",
        element: (
          <PrivateRoute>
            <Interface />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/studentProfile",
        element: (
          <PrivateRoute>
            <StudentProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateStudentProfile",
        element: (
          <PrivateRoute>
            <UpdateStudentProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/studentEnrollments",
        element: (
          <PrivateRoute>
            <StudentEnrollments />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/studentPaymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
