import { signOut } from "firebase/auth";
import { FaGripfire } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import auth from "../../Firebase/Firebase.Config";
import { logoutUser } from "../../Redux/features/userSlice";
import Swal from "sweetalert2";

const Navbar = () => {
  // states
  const { userEmail } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const navlinks = (
    <>
      <NavLink to="/">
        <li className="p-2 font-bold text-black">Home</li>
      </NavLink>
      <NavLink to="/courses">
        <li className="p-2 font-bold text-black">All Courses</li>
      </NavLink>
      <NavLink to="/teacher">
        <li className="p-2 font-bold text-black">Teacher Enrollment</li>
      </NavLink>
      <NavLink to="/dashboard/interface">
        <li className="p-2 font-bold text-black">Dashboard</li>
      </NavLink>
    </>
  );

  // handle logout
  const handleLogout = () => {
    signOut(auth);
    dispatch(logoutUser());

    // navigating the user and showing a success alert
    navigate(-1);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout SuccessFull",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="w-full h-full border-b-2">
      <div className="navbar w-full h-full mx-auto justify-between sm:w-4/5">
        <div className="justify-start">
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
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
            >
              {navlinks}
            </ul>
          </div>
          {/* <h1 className="text-2xl font-bold flex items-center"> */}
          <h1 className="text-sm font-bold flex items-center sm:text-lg xl:text-2xl">
            <FaGripfire />
            Learnio
          </h1>
        </div>
        <div className="flex sm:gap-2">
          <div className="justify-start hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navlinks}</ul>
          </div>
          <div className="flex justify-end items-center gap-2">
            {userEmail ? (
              <button
                onClick={handleLogout}
                className="btn hover:bg-red-600 hover:text-white"
              >
                logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button className="text-xs p-2 font-bold rounded-xl border border-black hover:bg-black hover:text-white sm:text-sm lg:text-base xl:btn">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="text-xs p-2 font-bold rounded-xl border border-black hover:bg-black hover:text-white sm:text-sm lg:text-base xl:btn">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
