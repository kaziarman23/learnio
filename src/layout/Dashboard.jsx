import { signOut } from "firebase/auth";
import { CgLogOut, CgProfile } from "react-icons/cg";
import {
  FaChalkboardTeacher,
  FaGripfire,
  FaHome,
  FaRegCreditCard,
  FaUsers,
} from "react-icons/fa";
import { SiCoursera, SiGoogleclassroom } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/features/userSlice";
import { MdAnalytics, MdDashboard, MdPreview } from "react-icons/md";
import auth from "../Firebase/Firebase.Config";
import { HiArchiveBox, HiArchiveBoxArrowDown } from "react-icons/hi2";
import Loading from "../components/Loading/Loading";
import { VscOpenPreview } from "react-icons/vsc";
import { useGetUsersQuery } from "../Redux/features/api/usersApi";
import toast from "react-hot-toast";

const Dashboard = () => {
  // states
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { userEmail } = useSelector((state) => state.userSlice);

  // Rtk query hooks
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error When fetching user data: ", error.error);

    // showing an error alert
    toast.error("Error When fetching user data");
    return null;
  }

  // finding the data
  const userInfo = data.find(
    (user) => user.userEmail.toLowerCase() === userEmail.toLowerCase(),
  );
  const user = userInfo?.userRole;

  // handle logout
  const handleLogout = () => {
    signOut(auth);
    dispatch(logoutUser());

    // navigating the user and showing a success alert
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <div className="flex flex-col bg-[#c7c1c1] lg:flex-row">
      {/* side bar content */}

      {/* THIS IS FOR SMALL SCREEN VIEW */}
      <div className="h-14 w-full bg-[#c7c1c1] md:mx-auto md:w-4/5 lg:hidden">
        <div className="flex">
          {/* dropdown menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-[#c7c1c1] p-2 shadow"
            >
              {user === "admin" ? (
                // Admin dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdAnalytics />
                    Analytics
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherRequiests"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <FaChalkboardTeacher />
                    Teacher Requiest
                  </NavLink>

                  <NavLink
                    to="/dashboard/courseReview"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <VscOpenPreview />
                    Course Review
                  </NavLink>

                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <FaUsers />
                    Users
                  </NavLink>
                </>
              ) : user === "teacher" ? (
                // Teacher dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/addCourse"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <HiArchiveBoxArrowDown />
                    Add Course
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherCourses"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <HiArchiveBox />
                    My Courses
                  </NavLink>
                  <NavLink
                    to="/dashboard/ReviewEnrollments"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdPreview />
                    Review Enrollments
                  </NavLink>
                </>
              ) : (
                // User dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentEnrollments"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <SiGoogleclassroom />
                    My Enrollments
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentPaymentHistory"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <FaRegCreditCard />
                    Payment History
                  </NavLink>
                </>
              )}

              <NavLink
                to="/"
                className="flex items-center gap-2 p-2 text-lg font-bold"
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className="flex items-center gap-2 p-2 text-lg font-bold"
              >
                <SiCoursera />
                All Courses
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 text-lg font-bold"
              >
                <CgLogOut />
                Logout
              </button>
            </ul>
          </div>
          {/* logo */}
          <h1 className="flex items-center justify-start text-xl font-bold">
            <FaGripfire />
            Learnio
          </h1>
        </div>
      </div>

      {/* THIS IS FOR LARGE SCREEN VIEW */}
      <div className="hidden min-h-screen w-64 bg-[#c7c1c1] lg:block">
        <div>
          {/* logo section  */}
          <h1 className="mt-5 flex items-center justify-center text-4xl font-bold">
            <FaGripfire />
            Learnio
          </h1>
          {/* // menu section  */}
          <div className="mt-10 p-4">
            <ul>
              {user === "admin" ? (
                // Admin dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdAnalytics />
                    Analytics
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherRequiests"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <FaChalkboardTeacher />
                    Teacher Requiest
                  </NavLink>

                  <NavLink
                    to="/dashboard/courseReview"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <VscOpenPreview />
                    Course Review
                  </NavLink>

                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <FaUsers />
                    Users
                  </NavLink>
                </>
              ) : user === "teacher" ? (
                // Teacher dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/addCourse"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <HiArchiveBoxArrowDown />
                    Add Course
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherCourses"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <HiArchiveBox />
                    My Courses
                  </NavLink>
                  <NavLink
                    to="/dashboard/ReviewEnrollments"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdPreview />
                    Review Enrollments
                  </NavLink>
                </>
              ) : (
                // User dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentEnrollments"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <SiGoogleclassroom />
                    My Enrollments
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentPaymentHistory"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 text-lg font-bold ${
                        isActive ? "rounded-2xl bg-black text-white" : ""
                      }`
                    }
                  >
                    <FaRegCreditCard />
                    Payment History
                  </NavLink>
                </>
              )}

              <hr className="my-10" />

              <NavLink
                to="/"
                className="flex items-center gap-2 p-2 text-lg font-bold"
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className="flex items-center gap-2 p-2 text-lg font-bold"
              >
                <SiCoursera />
                All Courses
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 text-lg font-bold"
              >
                <CgLogOut />
                Logout
              </button>
            </ul>
          </div>
        </div>
      </div>

      {/* main content*/}
      <div className="min-h-screen lg:flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
