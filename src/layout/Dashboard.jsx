import { signOut } from "firebase/auth";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaGripfire, FaHome, FaRegCreditCard } from "react-icons/fa";
import { SiCoursera, SiGoogleclassroom } from "react-icons/si";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { logoutUser } from "../Redux/features/userSlice";
import auth from "../Firebase/Firebase.Config";
import { MdDashboard } from "react-icons/md";

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
              <NavLink to="/dashboard/interface">
                <li className="p-2 text-lg font-bold flex items-center gap-2 bg-black text-white rounded-2xl">
                  <MdDashboard />
                  Interface
                </li>
              </NavLink>
              <NavLink to="/dashboard/studentProfile">
                <li className="p-2 text-lg font-bold flex items-center gap-2 rounded-2xl">
                  <CgProfile />
                  Profile
                </li>
              </NavLink>
              <NavLink to="/dashboard/studentEnrollments">
                <li className="p-2 text-lg font-bold flex items-center gap-2">
                  <SiGoogleclassroom />
                  My Enrollments
                </li>
              </NavLink>
              <NavLink to="/dashboard/studentPaymentHistory">
                <li className="p-2 text-lg font-bold flex items-center gap-2">
                  <FaRegCreditCard />
                  Payment History
                </li>
              </NavLink>

              <hr className="my-10" />

              <NavLink to="/">
                <li className="p-2 text-lg font-bold flex items-center gap-2">
                  <FaHome />
                  Home
                </li>
              </NavLink>
              <NavLink to="/courses">
                <li className="p-2 text-lg font-bold flex items-center gap-2">
                  <SiCoursera />
                  All Courses
                </li>
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
