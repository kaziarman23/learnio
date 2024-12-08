import { signOut } from "firebase/auth";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaGripfire, FaHome, FaRegCreditCard } from "react-icons/fa";
import { SiCoursera, SiGoogleclassroom } from "react-icons/si";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/features/userSlice";
import { MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";
import auth from "../Firebase/Firebase.Config";

const Dashboard = () => {
  // states
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const userRole = "user";
  return (
    <div className="flex h-screen">
      {/* side bar content */}
      <div className="w-64 min-h-full bg-[#c7c1c1]">
        <div>
          {/* logo section */}
          <h1 className="text-4xl font-bold flex justify-center items-center mt-5">
            <FaGripfire />
            Learnio
          </h1>
          {/* menu section */}
          <div className="mt-10 p-4">
            <ul>
              {userRole === "admin" ? (
                // Admin dashboard
                <></>
              ) : userRole === "teacher" ? (
                // Teacher dashboard
                <></>
              ) : (
                // User dashboard
                <>
                  <NavLink
                    to="/dashboard/interface"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${
                        isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <MdDashboard />
                    Interface
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentProfile"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${
                        isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <CgProfile />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentEnrollments"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${
                        isActive ? "bg-black text-white rounded-2xl" : ""
                      }`
                    }
                  >
                    <SiGoogleclassroom />
                    My Enrollments
                  </NavLink>
                  <NavLink
                    to="/dashboard/studentPaymentHistory"
                    className={({ isActive }) =>
                      `p-2 text-lg font-bold flex items-center gap-2 ${
                        isActive ? "bg-black text-white rounded-2xl" : ""
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
                <BiSolidLogOutCircle />
                Logout
              </button>
            </ul>
          </div>
        </div>
      </div>
      {/* main outlet */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
