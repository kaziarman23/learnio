import { signOut } from "firebase/auth";
import { FaGripfire } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import auth from "../../Firebase/Firebase.Config";
import { logoutUser } from "../../Redux/features/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  // states
  const { userEmail } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navlinks = (
    <>
      <NavLink to="/">
        <li className="p-2 font-bold text-black hover:text-orange-500">Home</li>
      </NavLink>
      <NavLink to="/courses">
        <li className="p-2 font-bold text-black hover:text-orange-500">
          All Courses
        </li>
      </NavLink>
      <NavLink to="/teacher">
        <li className="p-2 font-bold text-black hover:text-orange-500">
          Teacher Enrollment
        </li>
      </NavLink>
      <NavLink to="/dashboard/interface">
        <li className="p-2 font-bold text-black hover:text-orange-500">
          Dashboard
        </li>
      </NavLink>
    </>
  );

  // handle logout
  const handleLogout = () => {
    signOut(auth);
    dispatch(logoutUser());

    // navigating the user
    navigate(-1);

    // showing an alert Logout SuccessFull
    toast.success("Logout Successfully");
  };

  return (
    <div className="h-full w-full">
      <div className="navbar mx-auto h-full w-full justify-between sm:w-4/5">
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
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-white p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>

          <h1 className="flex items-center text-sm font-bold sm:text-lg xl:text-2xl">
            <FaGripfire />
            <span className="text-black hover:text-orange-500">Learnio</span>
          </h1>
        </div>
        <div className="flex sm:gap-2">
          <div className="hidden justify-start lg:flex">
            <ul className="menu menu-horizontal px-1">{navlinks}</ul>
          </div>
          <div className="flex items-center justify-end gap-2">
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
                  <button className="rounded-xl border border-black p-2 text-xs font-bold xl:btn hover:bg-black hover:text-white sm:text-sm lg:text-base">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="rounded-xl border border-black p-2 text-xs font-bold xl:btn hover:bg-black hover:text-white sm:text-sm lg:text-base">
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
