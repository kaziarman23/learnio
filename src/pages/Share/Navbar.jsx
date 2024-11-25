import { FaGripfire } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
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
    </>
  );

  return (
    <div className="w-full h-full border-b-2">
      <div className="navbar w-4/5 h-full mx-auto justify-between">
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
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>
          <h1 className="text-2xl font-bold flex items-center">
            <FaGripfire />
            Learnio
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="justify-start hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navlinks}</ul>
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn hover:bg-black hover:text-white">
              Register
            </button>
            <button className="btn hover:bg-black hover:text-white">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
