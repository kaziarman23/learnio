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
import Swal from "sweetalert2";
import auth from "../Firebase/Firebase.Config";
import { HiArchiveBox, HiArchiveBoxArrowDown } from "react-icons/hi2";
import Loading from "../components/Loading/Loading";
import { VscOpenPreview } from "react-icons/vsc";
import { useGetUsersQuery } from "../Redux/features/api/usersApi";
import { BiSolidLogOutCircle } from "react-icons/bi";

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
    Swal.fire({
      title: "Error!",
      text: "Error When fetching user data",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  // finding the data
  const userInfo = data.find(
    (user) => user.userEmail.toLowerCase() === userEmail.toLowerCase()
  );
  const user = userInfo?.userRole;

  // handle logout
  const handleLogout = () => {
    signOut(auth);
    dispatch(logoutUser());

    // navigating the user and showing a success alert
    navigate("/");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout SuccessFull",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="flex flex-col bg-[#c7c1c1] lg:flex-row">
      {/* side bar content */}

      {/* THIS IS FOR SMALL SCREEN VIEW */}
      <div className="w-full h-14 bg-[#c7c1c1] md:w-4/5 md:mx-auto lg:hidden">
        <div className='flex'>
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
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-[#c7c1c1]"
            >
              {user === "admin" ? (
                // Admin dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdAnalytics />
                    Analytics
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherRequiests"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <FaChalkboardTeacher />
                    Teacher Requiest
                  </NavLink>

                  <NavLink
                    to="/dashboard/courseReview"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <VscOpenPreview />
                    Course Review
                  </NavLink>

                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
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
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/addCourse"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <HiArchiveBoxArrowDown />
                    Add Course
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherCourses"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <HiArchiveBox />
                    My Courses
                  </NavLink>
                  <NavLink
                    to="/dashboard/ReviewEnrollments"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
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
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentEnrollments"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <SiGoogleclassroom />
                    My Enrollments
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentPaymentHistory"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
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
                className="p-2 text-lg font-bold flex items-center gap-2"
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className="p-2 text-lg font-bold flex items-center gap-2"
              >
                <SiCoursera />
                All Courses
              </NavLink>
              <button
                onClick={handleLogout}
                className="p-2 text-lg font-bold flex items-center gap-2"
              >
                <CgLogOut />
                Logout
              </button>
            </ul>
          </div>
          {/* logo */}
          <h1 className="text-xl font-bold flex justify-start items-center">
            <FaGripfire />
            Learnio
          </h1>
        </div>
      </div>

      {/* THIS IS FOR LARGE SCREEN VIEW */}
      <div className="hidden lg:block w-64 min-h-screen bg-[#c7c1c1]">
        <div>
          {/* logo section  */}
          <h1 className="text-4xl font-bold flex justify-center items-center mt-5">
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
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdAnalytics />
                    Analytics
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherRequiests"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <FaChalkboardTeacher />
                    Teacher Requiest
                  </NavLink>

                  <NavLink
                    to="/dashboard/courseReview"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <VscOpenPreview />
                    Course Review
                  </NavLink>

                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
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
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/addCourse"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <HiArchiveBoxArrowDown />
                    Add Course
                  </NavLink>
                  <NavLink
                    to="/dashboard/teacherCourses"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <HiArchiveBox />
                    My Courses
                  </NavLink>
                  <NavLink
                    to="/dashboard/ReviewEnrollments"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
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
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentEnrollments"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <SiGoogleclassroom />
                    My Enrollments
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentPaymentHistory"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${isActive ? "bg-black text-white rounded-2xl" : ""
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
                className="p-2 text-lg font-bold flex items-center gap-2"
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className="p-2 text-lg font-bold flex items-center gap-2"
              >
                <SiCoursera />
                All Courses
              </NavLink>

              <button
                onClick={handleLogout}
                className="p-2 text-lg font-bold flex items-center gap-2"
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
